db.createUser(  {    user  : "admin",    pwd   : "admin",    roles : [       {         role : "readWrite",         db   : "gym-db"        }    ]  });
db = db.getSiblingDB("gym-db");
db.createCollection("users");
db.users.insertOne({"role":"ADMIN","blocked":false,"name":"Administrador","email":"admin@gmail.com","password":"$2b$10$znRN8jjLpizXXAmOWiam6.kmZakfZ5ZRg5fFElBnO5kF3GFgG.BW.","__v":0});
db.users.insertOne({"role":"USER","blocked":false,"name":"Usuario","email":"user@gmail.com","password":"$2b$10$znRN8jjLpizXXAmOWiam6.kmZakfZ5ZRg5fFElBnO5kF3GFgG.BW.","__v":0});
db.users.insertOne({"role":"USER","blocked":false,"name":"Juan Perez","email":"jp@gmail.com","password":"$2b$10$znRN8jjLpizXXAmOWiam6.kmZakfZ5ZRg5fFElBnO5kF3GFgG.BW.","__v":0});
db.users.insertOne({"role":"ADMIN","blocked":false,"name":"Ana Gomez","email":"ag@gmail.com","password":"$2b$10$znRN8jjLpizXXAmOWiam6.kmZakfZ5ZRg5fFElBnO5kF3GFgG.BW.","__v":0});

db.createCollection("rooms");
db.rooms.insertOne({"__v": 0,
    "airConditioner": false,
    "capacity": 30,
    "description": "Sala de Entrenamiento Funcional",
    "name": "Funcional 1",
    "type": "Gimnasia",
});
db.rooms.insertOne({"__v": 0,
    "airConditioner": true,
    "capacity": 15,
    "description": "Sala de Spinning",
    "name": "Spinning 1",
    "type": "Spinning",
});
db.rooms.insertOne({"__v": 0,
    "airConditioner": false,
    "capacity": 25,
    "description": "Sala de Musculación Planta Baja",
    "name": "Musculación 1",
    "type": "Musculacion",
});

db.rooms.insertOne({"__v": 0,
    "airConditioner": true,
    "capacity": 16,
    "description": "Sala de Musculación Primer Piso",
    "name": "Musculación 2",
    "type": "Musculacion",
});

