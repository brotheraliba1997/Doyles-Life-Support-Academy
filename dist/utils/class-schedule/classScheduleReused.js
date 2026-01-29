"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddStudentToClassScheduleService = AddStudentToClassScheduleService;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
async function AddStudentToClassScheduleService(classScheduleModel, courseId, studentId, scheduleData) {
    const existingSchedule = await classScheduleModel.findOne({
        course: new mongoose_1.Types.ObjectId(courseId),
    });
    let schedule = null;
    if (existingSchedule) {
        if (existingSchedule.students.length > 0 &&
            existingSchedule.students.some((s) => s?.id?.toString() === studentId?.toString())) {
            throw new common_1.BadRequestException(`Student ${studentId} is already added in schedule ${existingSchedule._id}`);
        }
        existingSchedule.students.push(new mongoose_1.Types.ObjectId(studentId));
        await existingSchedule.save();
        console.log(`✅ Student ${studentId} added to schedule ${existingSchedule._id}`);
        schedule = existingSchedule;
    }
    else {
        schedule = await classScheduleModel.create({
            ...scheduleData,
            course: new mongoose_1.Types.ObjectId(courseId),
            students: [studentId],
        });
        console.log(`✅ New schedule created with student ${studentId}`);
    }
    return schedule;
}
//# sourceMappingURL=classScheduleReused.js.map