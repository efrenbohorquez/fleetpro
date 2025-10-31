
import { Driver, Vehicle, TransportRequest, MaintenanceRecord, Survey, DriverStatus, VehicleStatus, RequestStatus, MaintenanceType, MaintenanceStatus, VehicleHistory } from '../types';

export const drivers: Driver[] = [
  {
    "id": "d1",
    "name": "Carlos santiagoquijano Bautista",
    "licenseNumber": "L1000000",
    "contact": "555-1000",
    "status": DriverStatus.Available
  },
  {
    "id": "d2",
    "name": "Nestor aureliocastañeda Hernandez",
    "licenseNumber": "L1000001",
    "contact": "311 2890277",
    "status": DriverStatus.Available
  },
  {
    "id": "d3",
    "name": "Luis fernandomantilla Rey",
    "licenseNumber": "L1000002",
    "contact": "555-1002",
    "status": DriverStatus.Available
  },
  {
    "id": "d4",
    "name": "Ronald israelherreño Suarez",
    "licenseNumber": "L1000003",
    "contact": "314 3909733",
    "status": DriverStatus.Available
  },
  {
    "id": "d5",
    "name": "Gerardoenciso Tierradentro",
    "licenseNumber": "L1000004",
    "contact": "312 7875167",
    "status": DriverStatus.Available
  },
  {
    "id": "d6",
    "name": "Carlos alfonsolopez Rodriguez",
    "licenseNumber": "L1000005",
    "contact": "311 2692534",
    "status": DriverStatus.Available
  },
  {
    "id": "d7",
    "name": "Martinmolano Ortiz",
    "licenseNumber": "L1000006",
    "contact": "320 8543171",
    "status": DriverStatus.Available
  },
  {
    "id": "d8",
    "name": "Mauricio vicenteramirez Avila",
    "licenseNumber": "L1000007",
    "contact": "313 4940922",
    "status": DriverStatus.Available
  },
  {
    "id": "d9",
    "name": "Jorge williamdiaz Beltran",
    "licenseNumber": "L1000008",
    "contact": "310 2524992",
    "status": DriverStatus.Available
  },
  {
    "id": "d10",
    "name": "Jorge enriqueurrego Urrego",
    "licenseNumber": "L1000009",
    "contact": "313 2843656",
    "status": DriverStatus.Available
  },
  {
    "id": "d11",
    "name": "Jorge andrésrojas Villamil",
    "licenseNumber": "L1000010",
    "contact": "310 2462980",
    "status": DriverStatus.Available
  },
  {
    "id": "d12",
    "name": "Fernandogomez Gutierrez",
    "licenseNumber": "L1000011",
    "contact": "555-1011",
    "status": DriverStatus.Available
  },
  {
    "id": "d13",
    "name": "Jorge andresduran Arias",
    "licenseNumber": "L1000012",
    "contact": "314 2795685",
    "status": DriverStatus.Available
  },
  {
    "id": "d14",
    "name": "Jairo ernestomartinez Luque",
    "licenseNumber": "L1000013",
    "contact": "300 2190583",
    "status": DriverStatus.Available
  },
  {
    "id": "d15",
    "name": "Cesar augustovillalba Giraldo",
    "licenseNumber": "L1000014",
    "contact": "321 4124562",
    "status": DriverStatus.Available
  },
  {
    "id": "d16",
    "name": "Luis jorgede Castro mejia",
    "licenseNumber": "L1000015",
    "contact": "310 8539489",
    "status": DriverStatus.Available
  },
  {
    "id": "d17",
    "name": "Rodrigodiaz Ramirez",
    "licenseNumber": "L1000016",
    "contact": "301 4643991",
    "status": DriverStatus.Available
  },
  {
    "id": "d18",
    "name": "Juan ricardourrea Beltran",
    "licenseNumber": "L1000017",
    "contact": "310 5525717",
    "status": DriverStatus.Available
  },
  {
    "id": "d19",
    "name": "Fabio antonioramirez Moreno",
    "licenseNumber": "L1000018",
    "contact": "350 7129890",
    "status": DriverStatus.Available
  },
  {
    "id": "d20",
    "name": "Carlos antonioherreño Roa",
    "licenseNumber": "L1000019",
    "contact": "320 4116691",
    "status": DriverStatus.Available
  },
  {
    "id": "d21",
    "name": "German humbertopardo Gomez",
    "licenseNumber": "L1000020",
    "contact": "300 4441063",
    "status": DriverStatus.Available
  },
  {
    "id": "d22",
    "name": "Cesar ricardomarin Rodriguez",
    "licenseNumber": "L1000021",
    "contact": "313 2412132",
    "status": DriverStatus.Available
  },
  {
    "id": "d23",
    "name": "Efrenbohorquez Vargas",
    "licenseNumber": "L1000022",
    "contact": "555-1022",
    "status": DriverStatus.Available
  },
  {
    "id": "d24",
    "name": "Wilsonrico Hernandez",
    "licenseNumber": "L1000023",
    "contact": "316 5204851",
    "status": DriverStatus.Available
  },
  {
    "id": "d25",
    "name": "Juan carlosrodriguez Ovalle",
    "licenseNumber": "L1000024",
    "contact": "300 2343070",
    "status": DriverStatus.Available
  },
  {
    "id": "d26",
    "name": "Johnnyburbano ",
    "licenseNumber": "L1000025",
    "contact": "322 6044135",
    "status": DriverStatus.Available
  },
  {
    "id": "d27",
    "name": "Henry orlandomorales Lopez",
    "licenseNumber": "L1000026",
    "contact": "314 2120312",
    "status": DriverStatus.Available
  },
  {
    "id": "d28",
    "name": "Jorge danieldutary Espitia",
    "licenseNumber": "L1000027",
    "contact": "555-1027",
    "status": DriverStatus.Available
  },
  {
    "id": "d29",
    "name": "Jose alfredocruz Casallas",
    "licenseNumber": "L1000028",
    "contact": "555-1028",
    "status": DriverStatus.Available
  },
  {
    "id": "d30",
    "name": "Luis giovannyavila Ariza",
    "licenseNumber": "L1000029",
    "contact": "555-1029",
    "status": DriverStatus.Available
  },
  {
    "id": "d31",
    "name": "Jorge willingtonmuñoz Arboleda",
    "licenseNumber": "L1000030",
    "contact": "555-1030",
    "status": DriverStatus.Available
  },
  {
    "id": "d32",
    "name": "Luis Fernandobaquero",
    "licenseNumber": "L1000031",
    "contact": "555-1031",
    "status": DriverStatus.Available
  },
  {
    "id": "d33",
    "name": "Elizabethgonzález Guerrero",
    "licenseNumber": "L1000032",
    "contact": "555-1032",
    "status": DriverStatus.Available
  },
  {
    "id": "d34",
    "name": "Henrybautista Camargo",
    "licenseNumber": "L1000033",
    "contact": "312 6206856",
    "status": DriverStatus.Available
  },
  {
    "id": "d35",
    "name": "Nelson stivensonmartinez Castañeda",
    "licenseNumber": "L1000034",
    "contact": "555-1034",
    "status": DriverStatus.Available
  },
  {
    "id": "d36",
    "name": "Hernan julioortiz Chaves",
    "licenseNumber": "L1000035",
    "contact": "555-1035",
    "status": DriverStatus.Available
  },
  {
    "id": "d37",
    "name": "Elkin albertomarentes González",
    "licenseNumber": "L1000036",
    "contact": "555-1036",
    "status": DriverStatus.Available
  },
  {
    "id": "d38",
    "name": "Raúlsarmiento ",
    "licenseNumber": "L1000037",
    "contact": "301 8611539",
    "status": DriverStatus.Available
  },
  {
    "id": "d39",
    "name": "Jimmy andreslondoño Lopez",
    "licenseNumber": "L1000038",
    "contact": "555-1038",
    "status": DriverStatus.Available
  },
  {
    "id": "d40",
    "name": "Miguel alexandercorredor Rey",
    "licenseNumber": "L1000039",
    "contact": "555-1039",
    "status": DriverStatus.Available
  }
];

export const vehicles: Vehicle[] = [
  {
    "id": "v1",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "OLN048",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/OLN048 Formato Hoja De Vida OLN048.xlsx"
  },
  {
    "id": "v2",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "OLM957",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/OLM957 Formato Hoja De Vida OLM957.xlsx"
  },
  {
    "id": "v3",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "OKZ667",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/OKZ667 Formato Hoja De Vida OKZ667.xlsx"
  },
  {
    "id": "v4",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "OKZ668",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/OKZ668 Formato Hoja De Vida OKZ668.xlsx"
  },
  {
    "id": "v5",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "OBG281",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/OBG281Formato Hoja De Vida OBG281.xlsx"
  },
  {
    "id": "v6",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "ODS952",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/ODS952 Formato Hoja De Vida ODS952.xlsx"
  },
  {
    "id": "v7",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "OBG308",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/OBG308 Formato Hoja De Vida OBG308.xlsx"
  },
  {
    "id": "v8",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "OLN050",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/OLN050 Formato Hoja De Vida OLN050.xlsx"
  },
  {
    "id": "v9",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "OLN047",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/OLN047 Formato Hoja De Vida OLN047.xlsx"
  },
  {
    "id": "v10",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "ODS945",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/ODS945 Formato Hoja De Vida ODS945.xlsx"
  },
  {
    "id": "v11",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "OKZ666",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/OKZ666 Formato Hoja De Vida OKZ666.xlsx"
  },
  {
    "id": "v12",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "ODS942",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/ODS942 Formato Hoja De Vida ODS942.xlsx"
  },
  {
    "id": "v13",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "OBH679",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/OBH679 Formato Hoja De Vida OBH679.xlsx"
  },
  {
    "id": "v14",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "GCW735",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/GCW735 Formato Hoja De Vida GCW735.xlsx"
  },
  {
    "id": "v15",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "ODS951",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/ODS951Formato Hoja De Vida ODS951.xlsx"
  },
  {
    "id": "v16",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "ODS944",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/ODS944 Formato Hoja De Vida ODS944.xlsx"
  },
  {
    "id": "v17",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "GCW736",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/GCW736 Formato Hoja De Vida GCW736.xlsx"
  },
  {
    "id": "v18",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "GCW737",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/GCW737 Formato Hoja De Vida GCW737.xlsx"
  },
  {
    "id": "v19",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "OKZ665",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/OKZ665 Formato Hoja De Vida OKZ665.xlsx"
  },
  {
    "id": "v20",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "GCW738",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/GCW738 Formato Hoja De Vida GCW738.xlsx"
  },
  {
    "id": "v21",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "ODS943",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/ODS943 Formato Hoja De Vida ODS943.xlsx"
  },
  {
    "id": "v22",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "GCW739",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/GCW739 Formato Hoja De Vida GCW739.xlsx"
  },
  {
    "id": "v23",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "JQV092",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/JQV092 Formato Hoja De Vida JQV092.xlsx"
  },
  {
    "id": "v24",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "JQV191",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/JQV191 Formato Hoja De Vida JQV191.xlsx"
  },
  {
    "id": "v25",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "JQV094",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/JQV094 Formato Hoja De Vida JQV094.xlsx"
  },
  {
    "id": "v26",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "OBG376",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/OBG376 Formato Hoja De Vida OBG376.xlsx"
  },
  {
    "id": "v27",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "UWD75C",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/UWD75C Formato Hoja De Vida UWD75C.xlsx"
  },
  {
    "id": "v28",
    "make": "Toyota",
    "model": "Vehículo Oficial",
    "year": 2022,
    "plate": "JQV093",
    "status": VehicleStatus.Available,
    "historyFile": "data/Hoja de Vida Vehículos/JQV093 Formato Hoja De Vida JQV093.xlsx"
  }
];

export const requests: TransportRequest[] = [
  {
    "id": "r32384",
    "requester": "LUIS GIOVANNY AVILA ARIZA",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2025-02-21",
    "origin": "Oficina Central",
    "destination": "Solicitud de servicio de trasporte para funcionari...",
    "passengers": 1,
    "status": RequestStatus.Completed,
    "vehicleId": "v1",
    "driverId": "d1"
  },
  {
    "id": "r32504",
    "requester": "JORGE ENRIQUE REYES ARDILA",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2025-03-03",
    "origin": "Oficina Central",
    "destination": "Se solicita del servicio de vehiculo para traslada...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v2",
    "driverId": "d2"
  },
  {
    "id": "r32531",
    "requester": "ELIZABETH CELIS RESTREPO",
    "department": "P.D. PARA LA INSTRUCCIÓN DISCIPLINARIA III",
    "date": "2025-03-05",
    "origin": "Oficina Central",
    "destination": "SE REQUIERE SERVICIO PARA ASISTIR REUNION ORQUESTA...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v3",
    "driverId": "d3"
  },
  {
    "id": "r32577",
    "requester": "KEIDER DE JESUS SARMIENTO MERCADO",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2025-03-06",
    "origin": "Oficina Central",
    "destination": "CORDIAL SALUDO, \nSE SOLICITA DE SU AMABLE COLABORA...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v2",
    "driverId": "d4"
  },
  {
    "id": "r32583",
    "requester": "CLARA MARITZA MONTOYA FLOREZ",
    "department": "DIRECCION ADMINISTRATIVA Y FINANCIERA",
    "date": "2025-03-12",
    "origin": "Oficina Central",
    "destination": "VISITA A LA LOCAL DE ANTONIO NARIÑO, RAFAEL URIBE ...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v1",
    "driverId": "d5"
  },
  {
    "id": "r32585",
    "requester": "ENNA ESMERALDA CARO GOMEZ",
    "department": "DESPACHO DEL PERSONERO DE BOGOTÁ D.C.",
    "date": "2025-03-07",
    "origin": "Oficina Central",
    "destination": "RUTA NORTE: Conmemoración Internacional del Día de...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v3",
    "driverId": "d5"
  },
  {
    "id": "r32586",
    "requester": "ENNA ESMERALDA CARO GOMEZ",
    "department": "DESPACHO DEL PERSONERO DE BOGOTÁ D.C.",
    "date": "2025-03-07",
    "origin": "Oficina Central",
    "destination": "RUTA SUR: Conmemoración Internacional del Día de l...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v4",
    "driverId": "d6"
  },
  {
    "id": "r28970",
    "requester": "OSCAR JAVIER GUZMáN VáSQUEZ",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2024-04-08",
    "origin": "Oficina Central",
    "destination": "Cordial saludo, se solicita por favor la asignació...",
    "passengers": 1,
    "status": RequestStatus.Completed,
    "vehicleId": "v5",
    "driverId": "d7"
  },
  {
    "id": "r28970",
    "requester": "OSCAR JAVIER GUZMáN VáSQUEZ",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2024-04-08",
    "origin": "Oficina Central",
    "destination": "Cordial saludo, se solicita por favor la asignació...",
    "passengers": 1,
    "status": RequestStatus.Completed,
    "vehicleId": "v5",
    "driverId": "d7"
  },
  {
    "id": "r28971",
    "requester": "HENRY RAMIREZ ZAMORA",
    "department": "P.D. PARA COOR. DE LA GEST DE LAS PERSONERIAS LOC",
    "date": "2024-04-08",
    "origin": "Oficina Central",
    "destination": "CAPACITACION VEEDORES CIUDADANOS JAC COMUNAL VILLA...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v6",
    "driverId": "d8"
  },
  {
    "id": "r32594",
    "requester": "WILFRAN VANEGAS DIAZ",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2025-03-07",
    "origin": "Oficina Central",
    "destination": "Se solicita vehículo para entrega de pedidos aseo ...",
    "passengers": 1,
    "status": RequestStatus.Completed,
    "vehicleId": "v5",
    "driverId": "d9"
  },
  {
    "id": "r32663",
    "requester": "LUIS CARLOS BALLéN ROJAS",
    "department": "P.D.  PARA LA COORD. PREVEN. Y CONTR. FUN. PUB.",
    "date": "2025-03-21",
    "origin": "Oficina Central",
    "destination": "DESDE LA COORDINACIÓN DE PREVENCIÓN Y CONTROL A LA...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v1",
    "driverId": "d10"
  },
  {
    "id": "r32670",
    "requester": "ANCIZAR PATINO GUEVARA",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2025-03-13",
    "origin": "Oficina Central",
    "destination": "Revisión Interruptores y red electrica de tomas en...",
    "passengers": 1,
    "status": RequestStatus.Completed,
    "vehicleId": "v7",
    "driverId": "d1"
  },
  {
    "id": "r32674",
    "requester": "MIGUEL ALEXANDER CORREDOR REY",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2025-03-14",
    "origin": "Oficina Central",
    "destination": "entrega pedido local suba...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v5",
    "driverId": "d2"
  },
  {
    "id": "r32675",
    "requester": "ANDREA LINARES GóMEZ",
    "department": "OFICINA ASESORA DE COMUNICACIONES",
    "date": "2025-03-27",
    "origin": "Oficina Central",
    "destination": "Buenos días.  Solicitamos las 2 (dos) Vans.  Una p...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v8",
    "driverId": "d11"
  },
  {
    "id": "r32676",
    "requester": "ANDREA LINARES GóMEZ",
    "department": "OFICINA ASESORA DE COMUNICACIONES",
    "date": "2025-03-26",
    "origin": "Oficina Central",
    "destination": "Buenas tardes.  Solicitamos las 2 (dos) Vans.  Una...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v8",
    "driverId": "d6"
  },
  {
    "id": "r32677",
    "requester": "MIGUEL ALEXANDER CORREDOR REY",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2025-03-14",
    "origin": "Oficina Central",
    "destination": "entrega pedidos de las locales tunjuelito-kenedy-e...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v5",
    "driverId": "d8"
  },
  {
    "id": "r32679",
    "requester": "JOSE NOEL ZAMUDIO FIGUEREDO",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2025-03-14",
    "origin": "Oficina Central",
    "destination": "Trasladar a Ramiro Bonilla y José Zamudio junto co...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v5",
    "driverId": "d3"
  },
  {
    "id": "r29094",
    "requester": "OSCAR JAVIER GUZMáN VáSQUEZ",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2024-04-23",
    "origin": "Oficina Central",
    "destination": "Cordial saludo, se solicita amablemente la asignac...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v7",
    "driverId": "d12"
  },
  {
    "id": "r29386",
    "requester": "FENITA ROMERO CAMARGO",
    "department": "P.D.  PARA LA COORD. PREVEN. Y CONTR. FUN. PUB.",
    "date": "2024-05-20",
    "origin": "Oficina Central",
    "destination": "SE REQUIERLLEVAR A LA PERSONERA DELEGADA PARA EL S...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v9",
    "driverId": "d13"
  },
  {
    "id": "r29411",
    "requester": "SANDRA MARCELA SANCHEZ CORONADO",
    "department": "P D PARA EL RELAC CON EL CIUD Y ASUNTOS LOC",
    "date": "2024-05-21",
    "origin": "Oficina Central",
    "destination": "Se requiere vehículo para llegar a la Localidad de...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v8",
    "driverId": "d14"
  },
  {
    "id": "r29759",
    "requester": "ENNA ESMERALDA CARO GOMEZ",
    "department": "DESPACHO DEL PERSONERO DE BOGOTÁ D.C.",
    "date": "2024-06-28",
    "origin": "Oficina Central",
    "destination": "Monitoreo, seguimiento e intervención en garantía ...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v7",
    "driverId": "d15"
  },
  {
    "id": "r30386",
    "requester": "LUIS GIOVANNY AVILA ARIZA",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2024-08-22",
    "origin": "Oficina Central",
    "destination": "Solicitud de transporte para el Director de Talent...",
    "passengers": 1,
    "status": RequestStatus.Completed,
    "vehicleId": "v10",
    "driverId": "d16"
  },
  {
    "id": "r30387",
    "requester": "LUIS GIOVANNY AVILA ARIZA",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2024-08-22",
    "origin": "Oficina Central",
    "destination": "Solicitud de transporte para funcionarios del Desp...",
    "passengers": 1,
    "status": RequestStatus.Completed,
    "vehicleId": "v1",
    "driverId": "d1"
  },
  {
    "id": "r32752",
    "requester": "ANCIZAR PATINO GUEVARA",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2025-03-20",
    "origin": "Oficina Central",
    "destination": "Mantenimiento e instalación de alumbrado en person...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v7",
    "driverId": "d14"
  },
  {
    "id": "r32795",
    "requester": "ENNA ESMERALDA CARO GOMEZ",
    "department": "DESPACHO DEL PERSONERO DE BOGOTÁ D.C.",
    "date": "2025-03-26",
    "origin": "Oficina Central",
    "destination": "Apoyo al equipo debido al encuentro deportivo en e...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v11",
    "driverId": "d17"
  },
  {
    "id": "r32840",
    "requester": "CLARA MARITZA MONTOYA FLOREZ",
    "department": "DIRECCION ADMINISTRATIVA Y FINANCIERA",
    "date": "2025-03-31",
    "origin": "Oficina Central",
    "destination": "Visita de seguimiento observaciones SGA en sedes l...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v3",
    "driverId": "d15"
  },
  {
    "id": "r32865",
    "requester": "LUIS GIOVANNY AVILA ARIZA",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2025-04-01",
    "origin": "Oficina Central",
    "destination": "Solicitud servicio de transporte para funcionarias...",
    "passengers": 1,
    "status": RequestStatus.Completed,
    "vehicleId": "v1",
    "driverId": "d8"
  },
  {
    "id": "r30534",
    "requester": "KEIDER DE JESUS SARMIENTO MERCADO",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2024-09-02",
    "origin": "Oficina Central",
    "destination": "CORDIAL SALUDO, SE SOLICITA DE SU AMABLE COLABORAC...",
    "passengers": 1,
    "status": RequestStatus.Completed,
    "vehicleId": "v7",
    "driverId": "d10"
  },
  {
    "id": "r31492",
    "requester": "ENNA ESMERALDA CARO GOMEZ",
    "department": "DESPACHO DEL PERSONERO DE BOGOTÁ D.C.",
    "date": "2024-10-31",
    "origin": "Oficina Central",
    "destination": "Monitoreo en garantía de derechos a grupo de vende...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v12",
    "driverId": "d3"
  },
  {
    "id": "r31623",
    "requester": "LUIS GIOVANNY AVILA ARIZA",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2024-11-13",
    "origin": "Oficina Central",
    "destination": "Sin especificar",
    "passengers": 1,
    "status": RequestStatus.Completed,
    "vehicleId": "v1",
    "driverId": "d15"
  },
  {
    "id": "r31683",
    "requester": "JENNY PAMELA PARRA",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2024-11-29",
    "origin": "Oficina Central",
    "destination": "Solicitud de vehículo institucional para dar ejecu...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v10",
    "driverId": "d10"
  },
  {
    "id": "r31684",
    "requester": "ROMULO ZORRO RODRIGUEZ",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2024-11-27",
    "origin": "Oficina Central",
    "destination": "Se solicita servicio de vehículo tipo van para tra...",
    "passengers": 1,
    "status": RequestStatus.Completed,
    "vehicleId": "v5",
    "driverId": "d16"
  },
  {
    "id": "r32948",
    "requester": "WILFRAN VANEGAS DIAZ",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2025-04-21",
    "origin": "Oficina Central",
    "destination": "Solicitud de vehículo para realizar entrega de ped...",
    "passengers": 1,
    "status": RequestStatus.Completed,
    "vehicleId": "v5",
    "driverId": "d18"
  },
  {
    "id": "r32952",
    "requester": "KEIDER DE JESUS SARMIENTO MERCADO",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2025-04-25",
    "origin": "Oficina Central",
    "destination": "CORDIAL SALUDO, SE SOLICITA DE SU AMABLE COLABORAC...",
    "passengers": 1,
    "status": RequestStatus.Completed,
    "vehicleId": "v5",
    "driverId": "d10"
  },
  {
    "id": "r32982",
    "requester": "ROXANA BAQUERO BARRIGA",
    "department": "DESPACHO DEL PERSONERO DE BOGOTÁ D.C.",
    "date": "2025-04-29",
    "origin": "Oficina Central",
    "destination": "Se solicita 2 vehículos para traslado de visita in...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v13",
    "driverId": "d7"
  },
  {
    "id": "r32982",
    "requester": "ROXANA BAQUERO BARRIGA",
    "department": "DESPACHO DEL PERSONERO DE BOGOTÁ D.C.",
    "date": "2025-04-29",
    "origin": "Oficina Central",
    "destination": "Se solicita 2 vehículos para traslado de visita in...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v13",
    "driverId": "d7"
  },
  {
    "id": "r32983",
    "requester": "INES FIERRO VILLA",
    "department": "SUBDIRECCION DE GESTION FINANCIERA",
    "date": "2025-04-30",
    "origin": "Oficina Central",
    "destination": "Se requiere el servicio de  transporte  para   des...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v14",
    "driverId": "d19"
  },
  {
    "id": "r32985",
    "requester": "MIGUEL ALEXANDER CORREDOR REY",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2025-05-02",
    "origin": "Oficina Central",
    "destination": "entrega de pedidos usme  san cristobal  tunjuelito...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v5",
    "driverId": "d4"
  },
  {
    "id": "r33034",
    "requester": "MARIO ALEXANDER MONROY GALLO",
    "department": "SUBDIRECCION DE DESARROLLO DEL TALENTO HUMANO",
    "date": "2025-05-19",
    "origin": "Oficina Central",
    "destination": "Buenas tardes, de manera atenta solicito servicio ...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v15",
    "driverId": "d13"
  },
  {
    "id": "r33046",
    "requester": "JORGE EDUARDO BERMúDEZ",
    "department": "SUBDIRECCION DE GESTION FINANCIERA",
    "date": "2025-05-15",
    "origin": "Oficina Central",
    "destination": "Transportar al Subdirector luego de reunión a la P...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v11",
    "driverId": "d11"
  },
  {
    "id": "r33052",
    "requester": "MARIO ALEXANDER MONROY GALLO",
    "department": "SUBDIRECCION DE DESARROLLO DEL TALENTO HUMANO",
    "date": "2025-05-20",
    "origin": "Oficina Central",
    "destination": "Buenas tardes, de manera atenta solicitamos su col...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v8",
    "driverId": "d5"
  },
  {
    "id": "r33105",
    "requester": "DIANA MARLENE ARéVALO GARZóN",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2025-06-05",
    "origin": "Oficina Central",
    "destination": "Transportar a las funcionarias Ginna Paola Sánchez...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v8",
    "driverId": "d14"
  },
  {
    "id": "r33107",
    "requester": "KEIDER DE JESUS SARMIENTO MERCADO",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2025-06-05",
    "origin": "Oficina Central",
    "destination": "CORDIAL SALUDO, SE SOLICITA DE SU AMABLE COLABORAC...",
    "passengers": 1,
    "status": RequestStatus.Completed,
    "vehicleId": "v2",
    "driverId": "d4"
  },
  {
    "id": "r33108",
    "requester": "WILFRAN VANEGAS DIAZ",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2025-06-05",
    "origin": "Oficina Central",
    "destination": "se solicita vehiculó para realizar entrega de pedi...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v7",
    "driverId": "d1"
  },
  {
    "id": "r33109",
    "requester": "JORGE EDUARDO BERMúDEZ",
    "department": "SUBDIRECCION DE GESTION FINANCIERA",
    "date": "2025-06-05",
    "origin": "Oficina Central",
    "destination": "Recorrido para firma de documentos por parte de lo...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v10",
    "driverId": "d10"
  },
  {
    "id": "r33121",
    "requester": "JOSE LUIS RODRIGUEZ BONILLA",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2025-06-10",
    "origin": "Oficina Central",
    "destination": "Recorrido para entrega de insumos de aseo, cafeter...",
    "passengers": 1,
    "status": RequestStatus.Completed,
    "vehicleId": "v16",
    "driverId": "d9"
  },
  {
    "id": "r31832",
    "requester": "LAURA VANESSA CASTAñEDA GALINDO",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2024-11-28",
    "origin": "Oficina Central",
    "destination": "CORDIAL SALUDO, POR MEDIO DEL PRESENTE ME PERMITO ...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v5",
    "driverId": "d9"
  },
  {
    "id": "r32275",
    "requester": "ADRIANA PEREZ SALCEDO",
    "department": "OFICINA DE CONTROL INTERNO",
    "date": "2025-02-10",
    "origin": "Oficina Central",
    "destination": "Favor suministrar vehículo para un llevar al Dr. J...",
    "passengers": 1,
    "status": RequestStatus.Pending,
    "vehicleId": "v12",
    "driverId": "d10"
  },
  {
    "id": "r32341",
    "requester": "ROMULO ZORRO RODRIGUEZ",
    "department": "SUBDIREC. DE RECURSOS FISICOS",
    "date": "2025-02-14",
    "origin": "Oficina Central",
    "destination": "Se solicita el servicio de vehículo tipo van o cam...",
    "passengers": 1,
    "status": RequestStatus.Completed,
    "vehicleId": "v5",
    "driverId": "d8"
  }
];

export const maintenance: MaintenanceRecord[] = [
  { 
    id: 'm1', 
    vehicleId: 'v1', 
    type: MaintenanceType.Preventive,
    status: MaintenanceStatus.Completed,
    scheduledDate: '2024-07-25',
    completedDate: '2024-07-25',
    description: 'Cambio de aceite y filtros', 
    cost: 150,
    mileage: 45000,
    workshop: 'Taller Automotriz Central',
    technician: 'Carlos Méndez',
    parts: ['Aceite sintético', 'Filtro de aceite', 'Filtro de aire'],
    notes: 'Mantenimiento rutinario completado sin novedades'
  },
  { 
    id: 'm2', 
    vehicleId: 'v2', 
    type: MaintenanceType.Corrective,
    status: MaintenanceStatus.Completed,
    scheduledDate: '2024-06-10',
    completedDate: '2024-06-11',
    description: 'Revisión y reparación del sistema de frenos', 
    cost: 250,
    mileage: 67000,
    workshop: 'Frenos Especialistas',
    technician: 'Miguel Ángel Torres',
    parts: ['Pastillas de freno delanteras', 'Discos de freno', 'Líquido de frenos'],
    notes: 'Se encontró desgaste en las pastillas. Reemplazo completo realizado.'
  },
  { 
    id: 'm3', 
    vehicleId: 'v3', 
    type: MaintenanceType.Preventive,
    status: MaintenanceStatus.Scheduled,
    scheduledDate: '2025-11-05',
    description: 'Mantenimiento preventivo de 50.000 km', 
    cost: 300,
    mileage: 49500,
    workshop: 'Servicio Oficial Toyota',
    technician: 'A asignar',
    parts: ['Aceite', 'Filtros', 'Bujías', 'Líquidos varios'],
    notes: 'Incluye revisión técnico-mecánica completa'
  },
  { 
    id: 'm4', 
    vehicleId: 'v1', 
    type: MaintenanceType.Preventive,
    status: MaintenanceStatus.Scheduled,
    scheduledDate: '2025-11-10',
    description: 'Revisión técnico-mecánica', 
    cost: 200,
    mileage: 50000,
    workshop: 'Centro de Diagnóstico Automotor',
    notes: 'Revisión obligatoria anual'
  },
  { 
    id: 'm5', 
    vehicleId: 'v5', 
    type: MaintenanceType.Corrective,
    status: MaintenanceStatus.InProgress,
    scheduledDate: '2025-11-01',
    description: 'Reparación sistema eléctrico', 
    cost: 450,
    mileage: 78000,
    workshop: 'Electro Auto',
    technician: 'Roberto Jiménez',
    parts: ['Alternador', 'Batería', 'Cables'],
    notes: 'Se detectó fallo en el alternador. En proceso de reparación.'
  },
];

export const surveys: Survey[] = [
  {
    "id": "s1",
    "requestId": "r32384",
    "rating": 4,
    "comments": "Sin comentarios",
    "date": "2025-02-21"
  },
  {
    "id": "s2",
    "requestId": "r28970",
    "rating": 4,
    "comments": "Gracias por la amable atención.",
    "date": "2024-04-08"
  },
  {
    "id": "s3",
    "requestId": "r28970",
    "rating": 4,
    "comments": "Gracias por la amable atención.",
    "date": "2024-04-08"
  },
  {
    "id": "s4",
    "requestId": "r32594",
    "rating": 4,
    "comments": "Excelente apoyo y colaboración. Gracias",
    "date": "2025-03-07"
  },
  {
    "id": "s5",
    "requestId": "r32670",
    "rating": 4,
    "comments": "ok",
    "date": "2025-03-13"
  },
  {
    "id": "s6",
    "requestId": "r30386",
    "rating": 4,
    "comments": ".",
    "date": "2024-08-22"
  },
  {
    "id": "s7",
    "requestId": "r30387",
    "rating": 4,
    "comments": ".",
    "date": "2024-08-22"
  },
  {
    "id": "s8",
    "requestId": "r32865",
    "rating": 4,
    "comments": "Sin comentarios",
    "date": "2025-04-01"
  },
  {
    "id": "s9",
    "requestId": "r30534",
    "rating": 4,
    "comments": "N/A",
    "date": "2024-09-02"
  },
  {
    "id": "s10",
    "requestId": "r31623",
    "rating": 4,
    "comments": "Sin comentarios",
    "date": "2024-11-13"
  },
  {
    "id": "s11",
    "requestId": "r31684",
    "rating": 4,
    "comments": "Excelente servicio.",
    "date": "2024-11-27"
  },
  {
    "id": "s12",
    "requestId": "r32948",
    "rating": 4,
    "comments": "Excelente servicio apoyo y colaboración",
    "date": "2025-04-21"
  },
  {
    "id": "s13",
    "requestId": "r32952",
    "rating": 4,
    "comments": "Servicio Realizado.",
    "date": "2025-04-25"
  },
  {
    "id": "s14",
    "requestId": "r33107",
    "rating": 4,
    "comments": "SERVICIO REALIZADO.",
    "date": "2025-06-05"
  },
  {
    "id": "s15",
    "requestId": "r33121",
    "rating": 4,
    "comments": "Ninguna",
    "date": "2025-06-10"
  },
  {
    "id": "s16",
    "requestId": "r32341",
    "rating": 4,
    "comments": "Excelente servicio.",
    "date": "2025-02-14"
  },
  {
    "id": "s17",
    "requestId": "r32393",
    "rating": 4,
    "comments": "Sin comentarios",
    "date": "2025-02-20"
  },
  {
    "id": "s18",
    "requestId": "r26833",
    "rating": 4,
    "comments": "Gracias por el servicxio",
    "date": "2023-06-14"
  },
  {
    "id": "s19",
    "requestId": "r32885",
    "rating": 4,
    "comments": "SERVICIO REALIZADO.",
    "date": "2025-04-03"
  },
  {
    "id": "s20",
    "requestId": "r32936",
    "rating": 4,
    "comments": "SERVICIO REALIZADO.",
    "date": "2025-04-10"
  },
  {
    "id": "s21",
    "requestId": "r32947",
    "rating": 4,
    "comments": "Sin comentarios",
    "date": "2025-04-21"
  },
  {
    "id": "s22",
    "requestId": "r33000",
    "rating": 4,
    "comments": "Sin comentarios",
    "date": "2025-05-06"
  },
  {
    "id": "s23",
    "requestId": "r26933",
    "rating": 4,
    "comments": "Na",
    "date": "2023-06-30"
  },
  {
    "id": "s24",
    "requestId": "r33019",
    "rating": 4,
    "comments": "Sin comentarios",
    "date": "2025-05-09"
  },
  {
    "id": "s25",
    "requestId": "r33044",
    "rating": 4,
    "comments": "Sin comentarios",
    "date": "2025-05-16"
  },
  {
    "id": "s26",
    "requestId": "r33054",
    "rating": 4,
    "comments": "SERVICIO REALIZADO.",
    "date": "2025-05-16"
  },
  {
    "id": "s27",
    "requestId": "r33445",
    "rating": 4,
    "comments": "SERVICIO REALIZADO.",
    "date": "2025-09-01"
  },
  {
    "id": "s28",
    "requestId": "r33520",
    "rating": 4,
    "comments": "Sin comentarios",
    "date": "2025-09-10"
  },
  {
    "id": "s29",
    "requestId": "r33543",
    "rating": 4,
    "comments": "Excelente servicio",
    "date": "2025-09-12"
  },
  {
    "id": "s30",
    "requestId": "r33543",
    "rating": 4,
    "comments": "Excelente servicio",
    "date": "2025-09-12"
  }
]; // Limitar a 30 encuestas

export const vehicleHistoryFiles: VehicleHistory[] = [
  { vehicleId: 'v1', plate: 'OLN048', fileName: 'OLN048 Formato Hoja De Vida OLN048.xlsx', filePath: 'data/Hoja de Vida Vehículos/OLN048 Formato Hoja De Vida OLN048.xlsx' },
  { vehicleId: 'v2', plate: 'OLM957', fileName: 'OLM957 Formato Hoja De Vida OLM957.xlsx', filePath: 'data/Hoja de Vida Vehículos/OLM957 Formato Hoja De Vida OLM957.xlsx' },
  { vehicleId: 'v3', plate: 'OKZ667', fileName: 'OKZ667 Formato Hoja De Vida OKZ667.xlsx', filePath: 'data/Hoja de Vida Vehículos/OKZ667 Formato Hoja De Vida OKZ667.xlsx' },
  { vehicleId: 'v4', plate: 'OKZ668', fileName: 'OKZ668 Formato Hoja De Vida OKZ668.xlsx', filePath: 'data/Hoja de Vida Vehículos/OKZ668 Formato Hoja De Vida OKZ668.xlsx' },
  { vehicleId: 'v5', plate: 'OBG281', fileName: 'OBG281Formato Hoja De Vida OBG281.xlsx', filePath: 'data/Hoja de Vida Vehículos/OBG281Formato Hoja De Vida OBG281.xlsx' },
  { vehicleId: 'v6', plate: 'ODS952', fileName: 'ODS952 Formato Hoja De Vida ODS952.xlsx', filePath: 'data/Hoja de Vida Vehículos/ODS952 Formato Hoja De Vida ODS952.xlsx' },
  { vehicleId: 'v7', plate: 'OBG308', fileName: 'OBG308 Formato Hoja De Vida OBG308.xlsx', filePath: 'data/Hoja de Vida Vehículos/OBG308 Formato Hoja De Vida OBG308.xlsx' },
  { vehicleId: 'v8', plate: 'OLN050', fileName: 'OLN050 Formato Hoja De Vida OLN050.xlsx', filePath: 'data/Hoja de Vida Vehículos/OLN050 Formato Hoja De Vida OLN050.xlsx' },
  { vehicleId: 'v9', plate: 'OLN047', fileName: 'OLN047 Formato Hoja De Vida OLN047.xlsx', filePath: 'data/Hoja de Vida Vehículos/OLN047 Formato Hoja De Vida OLN047.xlsx' },
  { vehicleId: 'v10', plate: 'ODS945', fileName: 'ODS945 Formato Hoja De Vida ODS945.xlsx', filePath: 'data/Hoja de Vida Vehículos/ODS945 Formato Hoja De Vida ODS945.xlsx' },
  { vehicleId: 'v11', plate: 'OKZ666', fileName: 'OKZ666 Formato Hoja De Vida OKZ666.xlsx', filePath: 'data/Hoja de Vida Vehículos/OKZ666 Formato Hoja De Vida OKZ666.xlsx' },
  { vehicleId: 'v12', plate: 'ODS942', fileName: 'ODS942 Formato Hoja De Vida ODS942.xlsx', filePath: 'data/Hoja de Vida Vehículos/ODS942 Formato Hoja De Vida ODS942.xlsx' },
  { vehicleId: 'v13', plate: 'OBH679', fileName: 'OBH679 Formato Hoja De Vida OBH679.xlsx', filePath: 'data/Hoja de Vida Vehículos/OBH679 Formato Hoja De Vida OBH679.xlsx' },
  { vehicleId: 'v14', plate: 'GCW735', fileName: 'GCW735 Formato Hoja De Vida GCW735.xlsx', filePath: 'data/Hoja de Vida Vehículos/GCW735 Formato Hoja De Vida GCW735.xlsx' },
  { vehicleId: 'v15', plate: 'ODS951', fileName: 'ODS951Formato Hoja De Vida ODS951.xlsx', filePath: 'data/Hoja de Vida Vehículos/ODS951Formato Hoja De Vida ODS951.xlsx' },
  { vehicleId: 'v16', plate: 'ODS944', fileName: 'ODS944 Formato Hoja De Vida ODS944.xlsx', filePath: 'data/Hoja de Vida Vehículos/ODS944 Formato Hoja De Vida ODS944.xlsx' },
  { vehicleId: 'v17', plate: 'GCW736', fileName: 'GCW736 Formato Hoja De Vida GCW736.xlsx', filePath: 'data/Hoja de Vida Vehículos/GCW736 Formato Hoja De Vida GCW736.xlsx' },
  { vehicleId: 'v18', plate: 'GCW737', fileName: 'GCW737 Formato Hoja De Vida GCW737.xlsx', filePath: 'data/Hoja de Vida Vehículos/GCW737 Formato Hoja De Vida GCW737.xlsx' },
  { vehicleId: 'v19', plate: 'OKZ665', fileName: 'OKZ665 Formato Hoja De Vida OKZ665.xlsx', filePath: 'data/Hoja de Vida Vehículos/OKZ665 Formato Hoja De Vida OKZ665.xlsx' },
  { vehicleId: 'v20', plate: 'GCW738', fileName: 'GCW738 Formato Hoja De Vida GCW738.xlsx', filePath: 'data/Hoja de Vida Vehículos/GCW738 Formato Hoja De Vida GCW738.xlsx' },
  { vehicleId: 'v21', plate: 'ODS943', fileName: 'ODS943 Formato Hoja De Vida ODS943.xlsx', filePath: 'data/Hoja de Vida Vehículos/ODS943 Formato Hoja De Vida ODS943.xlsx' },
  { vehicleId: 'v22', plate: 'GCW739', fileName: 'GCW739 Formato Hoja De Vida GCW739.xlsx', filePath: 'data/Hoja de Vida Vehículos/GCW739 Formato Hoja De Vida GCW739.xlsx' },
  { vehicleId: 'v23', plate: 'JQV092', fileName: 'JQV092 Formato Hoja De Vida JQV092.xlsx', filePath: 'data/Hoja de Vida Vehículos/JQV092 Formato Hoja De Vida JQV092.xlsx' },
  { vehicleId: 'v24', plate: 'JQV191', fileName: 'JQV191 Formato Hoja De Vida JQV191.xlsx', filePath: 'data/Hoja de Vida Vehículos/JQV191 Formato Hoja De Vida JQV191.xlsx' },
  { vehicleId: 'v25', plate: 'JQV094', fileName: 'JQV094 Formato Hoja De Vida JQV094.xlsx', filePath: 'data/Hoja de Vida Vehículos/JQV094 Formato Hoja De Vida JQV094.xlsx' },
  { vehicleId: 'v26', plate: 'OBG376', fileName: 'OBG376 Formato Hoja De Vida OBG376.xlsx', filePath: 'data/Hoja de Vida Vehículos/OBG376 Formato Hoja De Vida OBG376.xlsx' },
  { vehicleId: 'v27', plate: 'UWD75C', fileName: 'UWD75C Formato Hoja De Vida UWD75C.xlsx', filePath: 'data/Hoja de Vida Vehículos/UWD75C Formato Hoja De Vida UWD75C.xlsx' },
  { vehicleId: 'v28', plate: 'JQV093', fileName: 'JQV093 Formato Hoja De Vida JQV093.xlsx', filePath: 'data/Hoja de Vida Vehículos/JQV093 Formato Hoja De Vida JQV093.xlsx' },
];

export const allData = {
    drivers,
    vehicles,
    requests,
    maintenance,
    surveys
}
