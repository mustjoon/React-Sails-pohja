      var winston = require('winston');                         
                         module.exports = {                                     
                                      'log': {                                             
                                         level:'info',                                             
                                         filePath:'sails.log',                                           
                                         'colors': false,                                            
                                         'custom': new (winston.Logger)({                                     
                                      'transports': [                                          
                                          new (winston.transports.Console)({                                         
                                         'level': 'silly',                                 
                                         'colorize': true,                                      
                                         'timestamp': false,                              
                                         'json': false                                                
                                               }),                                             
                                         new winston.transports.File({    
                                         'level': 'debug',                                          
                                         'colorize': false,                                           
                                         'timestamp': true,                                            
                                         'json': true,                                          
                                         'filename': './sails.log',                                             
                                         'maxsize': 5120000,                                             
                                         'maxFiles': 3                                                
                                             })                                          
                                           ]                                      
                                       })                                     
                                     }                                 
                                   };
