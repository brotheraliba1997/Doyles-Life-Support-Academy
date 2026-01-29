"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGoogleMeetLink = createGoogleMeetLink;
exports.sendScheduleEmails = sendScheduleEmails;
exports.createClassWithMeetAndEmail = createClassWithMeetAndEmail;
const crypto_1 = require("crypto");
const googleapis_1 = require("googleapis");
async function createGoogleMeetLink(oauth2Client, accessToken, refreshToken, eventData) {
    oauth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
    });
    const calendar = googleapis_1.google.calendar({
        version: 'v3',
        auth: oauth2Client,
    });
    const event = {
        summary: eventData.summary || 'Scheduled Class',
        description: eventData.description ||
            'Auto-generated class schedule with Google Meet link',
        start: {
            dateTime: `${eventData.date}T${eventData.time}:00Z`,
            timeZone: 'Asia/Karachi',
        },
        end: {
            dateTime: new Date(new Date(`${eventData.date}T${eventData.time}:00Z`).getTime() +
                eventData.duration * 60000).toISOString(),
            timeZone: 'Asia/Karachi',
        },
        conferenceData: {
            createRequest: {
                requestId: (0, crypto_1.randomUUID)(),
                conferenceSolutionKey: { type: 'hangoutsMeet' },
            },
        },
    };
    const response = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
        conferenceDataVersion: 1,
    });
    const googleMeetLink = response.data.conferenceData?.entryPoints?.[0]?.uri || '';
    const googleCalendarEventLink = response.data.htmlLink || '';
    return {
        googleMeetLink,
        googleCalendarEventLink,
        eventId: response.data.id,
    };
}
async function sendScheduleEmails(mailService, configService, classScheduleModel, scheduleId) {
    const populatedSchedule = await classScheduleModel
        .findById(scheduleId)
        .populate([
        { path: 'course' },
        { path: 'instructor' },
        { path: 'students' },
    ])
        .lean();
    if (!populatedSchedule) {
        console.error('Schedule not found for email notification');
        return { success: false, message: 'Schedule not found' };
    }
    const course = populatedSchedule.course;
    const students = populatedSchedule.students;
    const adminEmail = configService.get('app.adminEmail', {
        infer: true,
    });
    const lessonDate = new Date(populatedSchedule.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const emailData = {
        courseName: course?.title || 'Unknown Course',
        instructorName: "Instructor",
        lessonDate,
        lessonTime: populatedSchedule.time,
        duration: populatedSchedule.duration,
        googleMeetLink: populatedSchedule.googleMeetLink,
    };
    const emailResults = {
        admin: false,
        instructor: false,
        students: [],
    };
    try {
        if (adminEmail) {
            await mailService.lessonScheduled({
                to: adminEmail,
                data: emailData,
            });
            emailResults.admin = true;
            console.log(`✅ Email sent to admin: ${adminEmail}`);
        }
        return {
            success: true,
            message: 'Emails sent successfully',
            results: emailResults,
        };
    }
    catch (error) {
        console.error('Failed to send lesson schedule emails:', error);
        return {
            success: false,
            message: 'Failed to send emails',
            error: error.message,
        };
    }
}
async function createClassWithMeetAndEmail(params) {
    const { oauth2Client, accessToken, refreshToken, mailService, configService, classScheduleModel, scheduleData, } = params;
    try {
        const meetLinkData = await createGoogleMeetLink(oauth2Client, accessToken, refreshToken, {
            date: scheduleData.date,
            time: scheduleData.time,
            duration: scheduleData.duration,
        });
        console.log('✅ Google Meet link created:', meetLinkData.googleMeetLink);
        const schedule = await classScheduleModel.create({
            ...scheduleData,
            googleMeetLink: meetLinkData.googleMeetLink,
            googleCalendarEventLink: meetLinkData.googleCalendarEventLink,
            securityKey: (0, crypto_1.randomUUID)(),
        });
        console.log('✅ Schedule created:', schedule._id);
        const emailResult = await sendScheduleEmails(mailService, configService, classScheduleModel, schedule._id.toString());
        console.log('✅ Email notifications:', emailResult.message);
        return {
            success: true,
            schedule,
            meetLink: meetLinkData.googleMeetLink,
            emailsSent: emailResult.success,
        };
    }
    catch (error) {
        console.error('Error in createClassWithMeetAndEmail:', error);
        throw error;
    }
}
//# sourceMappingURL=createmeeting.js.map