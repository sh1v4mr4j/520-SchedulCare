export class Location {
  constructor(lat, long) {
    this.lat = lat;
    this.long = long;
  }
}

export class Place {
  constructor(name, address, location) {
    this.name = name;
    this.address = address;
    if (location instanceof Location) {
      this.location = location;
    } else {
      throw new Error("Invalid location object");
    }
  }
}