if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to example.";
  };
  Template.hello.picture = function(){
    var user = Meteor.users.findOne();
    return user;
  }

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
  Meteor.subscribe("userData");
  Meteor.subscribe("items");
}

Items = new Meteor.Collection("items");

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  Meteor.publish("userData",function(){
    return Meteor.users.find({},{fields:{'services.facebook.id':1}});
  });
  Meteor.publish("items", function(){
    return Items.find();
  });
  Items.allow({
    "insert": function(){return true},
    "update": function(){return this.owner==Meteor.userId()}
  });
  Meteor.methods({
    "addItem": function(data){
      return Items.insert({owner:Meteor.userId(), title:data.title, body:data.body});
    },
    "facebook": function(){
      var user = Meteor.user();
      id = user.services.facebook.id;
      token = user.services.facebook.accessToken;
      var result = HTTP.get("http://google.ro");
      console.log(result);
      return result;

    }
  });
}
