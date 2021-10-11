import RESTSerializer from '@ember-data/serializer/rest';
import {isBlank} from 'ember-utils';


export default class RuleSerializer extends RESTSerializer {
  primaryKey = '_id';

  serialize(snapshot, options){
    let json = {
      _id: snapshot._id
    }
    
    snapshot.eachAttribute(function(name){
      if(!isBlank(snapshot.attr(name))){
        json[name] = snapshot.attr(name);
      }
    });
    return json;
  }
}