type KM = number;

type PointLike = Record<"latitude" | "longitude", number | string>;

export class Point {
  readonly latitude: number;
  readonly longitude: number;

  static distance<T extends PointLike, U extends PointLike>(a: T, b: U) {
    return new Point(a.latitude, a.longitude).distance(
      new Point(b.latitude, b.longitude),
    );
  }

  constructor(latitude: number | string, longitude: number | string) {
    if ("string" === typeof latitude) {
      latitude = parseFloat(latitude);
    }

    if ("string" === typeof longitude) {
      longitude = parseFloat(longitude);
    }

    this.latitude = latitude;
    this.longitude = longitude;
  }

  /**
   * Calculates distance between two points based on haversine formula.
   * According to "Great-circle distance" article in Wikipedia, haversine
   * is a better choice to calculate distance on computer.
   *
   * PS: I have no idea how this function works
   *
   * https://en.wikipedia.org/wiki/Great-circle_distance
   * https://en.wikipedia.org/wiki/Haversine_formula
   *
   * Source: http://www.movable-type.co.uk/scripts/latlong.html
   *
   * @param point Other point to calculate distance
   * @returns {KM}
   */
  distance(point: Point): KM {
    const lat1 = this.latitude;
    const lon1 = this.longitude;
    const lat2 = point.latitude;
    const lon2 = point.longitude;

    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres

    return d / 1000;
  }
}
