"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogEntity = void 0;
class BlogEntity {
    constructor(id, title, content, author, comments, isPublished, createdAt, updatedAt, deletedAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.comments = comments;
        this.isPublished = isPublished;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}
exports.BlogEntity = BlogEntity;
//# sourceMappingURL=blog.js.map