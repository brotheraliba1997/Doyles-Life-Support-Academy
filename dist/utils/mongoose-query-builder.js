"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterQueryBuilder = void 0;
exports.buildMongooseQuery = buildMongooseQuery;
async function buildMongooseQuery(options) {
    const { model, filterQuery = {}, sortOptions, paginationOptions, populateFields, selectFields, mapper, } = options;
    const sort = sortOptions?.reduce((accumulator, sortOption) => {
        const field = sortOption.orderBy === 'id' ? '_id' : sortOption.orderBy || 'createdAt';
        const order = sortOption.order?.toUpperCase() === 'ASC' ? 1 : -1;
        return {
            ...accumulator,
            [field]: order,
        };
    }, {}) ?? { createdAt: -1 };
    let query = model
        .find(filterQuery)
        .sort(sort)
        .skip((paginationOptions.page - 1) * paginationOptions.limit)
        .limit(paginationOptions.limit);
    if (populateFields) {
        if (typeof populateFields === 'string') {
            query = query.populate(populateFields);
        }
        else if (Array.isArray(populateFields)) {
            populateFields.forEach((field) => {
                query = query.populate(field);
            });
        }
    }
    if (selectFields) {
        query = query.select(selectFields);
    }
    const docs = await query.lean();
    const totalItems = await model.countDocuments(filterQuery);
    const totalPages = Math.ceil(totalItems / paginationOptions.limit);
    const currentPage = paginationOptions.page;
    const data = mapper
        ? docs.map((doc) => mapper(doc))
        : docs;
    return {
        data,
        totalItems,
        totalPages,
        currentPage,
        limit: paginationOptions.limit,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
    };
}
class FilterQueryBuilder {
    constructor() {
        this.filter = {};
    }
    addEqual(field, value) {
        if (value !== undefined && value !== null) {
            this.filter[field] = value;
        }
        return this;
    }
    addRange(field, min, max) {
        if (min !== undefined || max !== undefined) {
            this.filter[field] = {};
            if (min !== undefined) {
                this.filter[field].$gte = min;
            }
            if (max !== undefined) {
                this.filter[field].$lte = max;
            }
        }
        return this;
    }
    addTextSearch(field, searchTerm) {
        if (searchTerm) {
            this.filter[field] = { $regex: searchTerm, $options: 'i' };
        }
        return this;
    }
    addIn(field, values) {
        if (values && values.length > 0) {
            this.filter[field] = { $in: values };
        }
        return this;
    }
    addCustom(field, condition) {
        if (condition !== undefined && condition !== null) {
            this.filter[field] = condition;
        }
        return this;
    }
    build() {
        return this.filter;
    }
}
exports.FilterQueryBuilder = FilterQueryBuilder;
//# sourceMappingURL=mongoose-query-builder.js.map