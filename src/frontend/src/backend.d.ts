import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface FeedbackMessage {
    id: bigint;
    name?: string;
    email?: string;
    message: string;
    timestamp: Time;
    category: MessageCategory;
}
export interface UserProfile {
    name: string;
}
export enum MessageCategory {
    question = "question",
    other = "other",
    contentSuggestion = "contentSuggestion",
    featureRequest = "featureRequest",
    bugReport = "bugReport"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllFeedbackMessages(): Promise<Array<FeedbackMessage>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitFeedback(name: string | null, email: string | null, message: string, category: MessageCategory): Promise<void>;
}
