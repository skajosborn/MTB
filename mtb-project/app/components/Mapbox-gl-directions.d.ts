// mapbox-gl-directions.d.ts
declare module '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions' {
  interface MapboxDirectionsOptions {
    accessToken: string;
    unit?: 'imperial' | 'metric';
    profile?: string;
    interactive?: boolean;
    controls?: {
      inputs?: boolean;
      instructions?: boolean;
      profileSwitcher?: boolean;
    };
    styles?: Array<Record<string, unknown>>;
    geocoder?: object;
    zoom?: number;
    placeholderOrigin?: string;
    placeholderDestination?: string;
    flyTo?: boolean;
  }

  class MapboxDirections {
    constructor(options: MapboxDirectionsOptions);
    onAdd(map: mapboxgl.Map): HTMLElement;
    onRemove(map: mapboxgl.Map): void;
    setOrigin(query: string | [number, number]): void;
    setDestination(query: string | [number, number]): void;
    removeRoutes(): void;
  }

  export default MapboxDirections;
}