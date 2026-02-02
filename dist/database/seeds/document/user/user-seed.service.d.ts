import { Model } from 'mongoose';
import { UserSchemaClass } from '../../../../users/schema/user.schema';
export declare class UserSeedService {
    private readonly model;
    constructor(model: Model<UserSchemaClass>);
    run(): Promise<void>;
}
