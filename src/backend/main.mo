import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Service "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the authorization system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Integrate blob storage support
  include MixinStorage();

  public type UserProfile = {
    name : Text;
    // Additional user metadata here
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func ping() : async Text {
    "Hello from Chouhan Handloom Backend!";
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      return null;
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      return null;
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      return;
    };
    userProfiles.add(caller, profile);
  };

  // Blob references are managed by MixinStorage;
  // Users must manage their own references to ExternalBlob.
};
