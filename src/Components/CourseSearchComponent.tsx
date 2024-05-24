'use client'

import React, { useEffect, useRef } from 'react'
import { useState } from "react";
import { Result } from '@/DataServices/Interfaces/Interfaces';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { GetMapDots } from '@/DataServices/DataServices';
import { Course, MapDots } from '@/DataServices/Interfaces/Interfaces';

const CourseSearchComponent = () => {

  const [userInput, setUserInput] = useState<string>("Stockton");
  const [courseData, setCourseData] = useState<Result>();
  const [courses, setCourses] = useState<Course[]>([]);

  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const geocoderContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';

    const newMap = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/standard',
      center: [-121, 37],
      zoom: 7,
      attributionControl: false
    });

    const getMap = async () => {
      const mapDots:MapDots = GetMapDots();
      return mapDots;
    }

    getMap().then(data => {

      newMap.on('load', () => {

        newMap.addSource('courses', {
          type:'geojson',
          data:data
        })

        newMap.addLayer({
          'id': 'courses',
          'type': 'circle',
          'source': 'courses',
          'paint': {
            'circle-radius': 12,
            'circle-stroke-width': 2,
            'circle-color': 'red',
            'circle-stroke-color': 'white'
          }
        })

      })
    })

    newMap.on('click', 'courses', (e:any) => {
            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;
            const name = e.features[0].properties.name;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(name)
                .addTo(newMap);

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
        placeholder: 'Enter Location'
      });
      geocoderContainerRef.current.appendChild(geocoder.onAdd(map));
    }

  }, [map])


  const [favClassName, setFavClassName] = useState<string>("-translate-x-full");
  const handleFavDrawerClick = () => {
    if (favClassName !== "-translate-x-full") {
      setFavClassName("-translate-x-full");
    } else {
      setFavClassName("");
    }
  }

  const [openModal, setOpenModal] = useState(true);
  return (
    <>
      <div className="bg-white opacity-95 rounded-xl p-10 py-5 sm:mx-[2%] md:mx-[5%] lg:mx-[10%] mt-4 flex flex-col justify-center items-center">
   
        <div className='w-4/5 md:w-3/5 lg:w-2/5 mb-6'>
          <button type="button" className=" underline " onClick={handleFavDrawerClick}>Favorites</button>
          <h1 className="text-3xl text-center pb-4 tracking-wide">Find A Course</h1>
          <div className='flex justify-center' ref={geocoderContainerRef}></div>
        </div>

        <div className='h-[400px] w-[100%] rounded-lg'>
          <div ref={mapContainer} className='h-[400px] w-[100%] rounded-lg'></div>
        </div>

      </div>

      {/* Start Drawer */}
      <div id="drawer-navigation" className={`fixed top-0 bg-[rgba(238,238,238,0.9)] left-0 z-40 w-full lg:w-[420px] h-screen p-4 overflow-y-auto transition-transform dark:bg-gray-800 ${favClassName}`}>
        <p id="drawer-navigation-label" className=" text-[2.8rem] font-bold">Bookmarked</p>
        <button onClick={handleFavDrawerClick} type="button" className=" bg-transparent  hover:text-gray-500 absolute top-6 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <svg aria-hidden="true" className="w-[50px] h-[50px] grid" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path></svg>
        </button>
        <div className="py-4 overflow-y-auto ">
          {/* <div id="getFavoritesDiv">
            {favorites.map((pokemonName: string, index: number) => (
              <div key={index} className="flex justify-between flex-row">
                <p className=" text-black  text-[32px] w-full rounded-l-lg px-2 cursor-pointer" onClick={() => setUserInput(pokemonName)}>
                  <span>{`${CapitalFirstLetter(pokemonName)}`}</span>
                </p>
                <button className=" text-[32px]  hover:text-gray-500 px-5 h-full" onClick={() => handleFavoriteClick(pokemonName)}  >
                  {"X"}
                </button>
              </div>
            ))}
          </div> */}
        </div>
      </div>
      {/* End Drawer */}
    </>
  )
}

export default CourseSearchComponent