import Array "mo:core/Array";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Text "mo:core/Text";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // --- Authorization ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --- User Profile Types ---
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // --- Feedback Types ---
  type MessageCategory = {
    #bugReport;
    #featureRequest;
    #question;
    #contentSuggestion;
    #other;
  };

  type FeedbackMessage = {
    id : Nat;
    timestamp : Time.Time;
    name : ?Text;
    email : ?Text;
    message : Text;
    category : MessageCategory;
  };

  module FeedbackMessage {
    public func compare(a : FeedbackMessage, b : FeedbackMessage) : Order.Order {
      if (a.id < b.id) { return #less };
      if (a.id > b.id) { return #greater };
      #equal;
    };
  };

  // --- Persistent Feedback Storage ---
  let feedbackMessages = Map.empty<Nat, FeedbackMessage>();
  var nextId = 0;

  // Public endpoint - accessible to everyone including guests
  public shared ({ caller }) func submitFeedback(
    name : ?Text,
    email : ?Text,
    message : Text,
    category : MessageCategory,
  ) : async () {
    // No authorization check - feedback form should be accessible to everyone
    if (message.size() == 0) {
      Runtime.trap("Message cannot be empty");
    };

    let feedbackMessage : FeedbackMessage = {
      id = nextId;
      timestamp = Time.now();
      name;
      email;
      message;
      category;
    };

    feedbackMessages.add(nextId, feedbackMessage);
    nextId += 1;
  };

  // Admin-only endpoint - viewing all feedback is sensitive
  public query ({ caller }) func getAllFeedbackMessages() : async [FeedbackMessage] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all feedback messages");
    };
    let allMessages = feedbackMessages.values().toArray().sort();
    return allMessages;
  };
};
