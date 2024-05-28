'use client'
import { GetMapDots } from '@/DataServices/DataServices';
import { Course, MapDots } from '@/DataServices/Interfaces/Interfaces';
import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Map = () => {

  const [courses, setCourses] = useState<Course[]>([]);

  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const geocoderContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';

    const newMap = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/standard',
      center: [-100, 30],
      zoom: 3,
      attributionControl: false
    });

    const getMap = async () => {
      const mapDots:any = await GetMapDots();
      return mapDots;
    }

    getMap().then(mapDots => {
      newMap.on('load', () => {

        newMap.addSource('Courses', {
          type: 'geojson',
          data: mapDots,
        })

        newMap.addLayer({
          'id': 'courses',
          'type': 'circle',
          'source': 'bathrooms',
          'paint': {
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-color': 'red',
            'circle-stroke-color': 'white'
          }
        })

      })
    })

    newMap.on('click', 'courses', (e:any) => {
          
      // add click logic

      

    })

    newMap.on('mouseenter', 'courses', () => {
      newMap.getCanvas().style.cursor = 'pointer';
    })

    newMap.on('mouseleave', 'courses', () => {
      newMap.getCanvas().style.cursor = '';
    })

    newMap.addControl(new mapboxgl.FullscreenControl());
    newMap.addControl(new mapboxgl.NavigationControl());
    newMap.addControl(new mapboxgl.ScaleControl());

    setMap(newMap);

  }, [])

  useEffect(() => {

    if(map && geocoderContainerRef.current) {
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: 'Search for a location...'
      });
      geocoderContainerRef.current.appendChild(geocoder.onAdd(map));
    }

  }, [map])

  return (
    <div>
      <div ref={mapContainer} className='h-[600px] w-[600px]'> </div>
      <div ref={geocoderContainerRef} className='h-[600px] w-[600px]'></div>
    </div>
  )
}

export default Map