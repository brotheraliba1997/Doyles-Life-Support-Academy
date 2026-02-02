"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertIdToString = convertIdToString;
exports.convertIdToStringOrFallback = convertIdToStringOrFallback;
exports.convertIdsToStrings = convertIdsToStrings;
exports.sanitizeMongooseDocument = sanitizeMongooseDocument;
exports.sanitizeMongooseDocuments = sanitizeMongooseDocuments;
exports.sanitizeReference = sanitizeReference;
function convertIdToString(doc) {
    if (!doc)
        return undefined;
    if (typeof doc.id !== 'undefined') {
        return doc.id;
    }
    if (doc._id) {
        if (typeof doc._id.toString === 'function') {
            return doc._id.toString();
        }
        if (typeof doc._id === 'string') {
            return doc._id;
        }
    }
    return undefined;
}
function convertIdToStringOrFallback(doc, fallback = '') {
    return convertIdToString(doc) ?? fallback;
}
function convertIdsToStrings(docs) {
    if (!Array.isArray(docs))
        return [];
    return docs
        .map((doc) => convertIdToString(doc))
        .filter((id) => typeof id === 'string');
}
function isObjectId(value) {
    if (!value || typeof value !== 'object')
        return false;
    if (value.buffer && typeof value.buffer === 'object') {
        return true;
    }
    if (value._bsontype === 'ObjectId') {
        return true;
    }
    if (typeof value.toString === 'function') {
        const str = value.toString();
        return /^[0-9a-fA-F]{24}$/.test(str);
    }
    return false;
}
function objectIdToString(objectId) {
    if (objectId.buffer) {
        const buffer = objectId.buffer;
        let hex = '';
        for (let i = 0; i < 12; i++) {
            const byte = buffer[i];
            hex += byte.toString(16).padStart(2, '0');
        }
        return hex;
    }
    if (typeof objectId.toString === 'function') {
        return objectId.toString();
    }
    return String(objectId);
}
function sanitizeMongooseDocument(data) {
    if (data === null || data === undefined) {
        return data;
    }
    if (typeof data !== 'object') {
        return data;
    }
    if (data instanceof Date) {
        return data;
    }
    if (isObjectId(data)) {
        return objectIdToString(data);
    }
    if (Array.isArray(data)) {
        return data.map((item) => sanitizeMongooseDocument(item));
    }
    if (data.toString &&
        typeof data.toString === 'function' &&
        data.toString() === '[object Object]' &&
        data.constructor &&
        data.constructor.name !== 'Object') {
        if (data._id) {
            return sanitizeMongooseDocument(data._id);
        }
    }
    const sanitized = {};
    for (const key in data) {
        if (!data.hasOwnProperty(key))
            continue;
        const value = data[key];
        if (key === '_id') {
            if (isObjectId(value)) {
                sanitized.id = objectIdToString(value);
            }
            else if (typeof value === 'string') {
                sanitized.id = value;
            }
            else {
                sanitized.id = sanitizeMongooseDocument(value);
            }
            continue;
        }
        sanitized[key] = sanitizeMongooseDocument(value);
    }
    return sanitized;
}
function sanitizeMongooseDocuments(docs) {
    if (!Array.isArray(docs))
        return [];
    return docs.map((doc) => sanitizeMongooseDocument(doc));
}
function sanitizeReference(ref, fields) {
    if (!ref)
        return null;
    if (isObjectId(ref)) {
        return objectIdToString(ref);
    }
    if (typeof ref === 'object') {
        const sanitized = sanitizeMongooseDocument(ref);
        if (fields && Array.isArray(fields)) {
            const filtered = {};
            fields.forEach((field) => {
                if (sanitized[field] !== undefined) {
                    filtered[field] = sanitized[field];
                }
            });
            if (sanitized.id) {
                filtered.id = sanitized.id;
            }
            return filtered;
        }
        return sanitized;
    }
    return ref;
}
//# sourceMappingURL=convert-id.js.map