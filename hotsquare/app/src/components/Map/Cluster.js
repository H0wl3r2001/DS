import React from "react";
import { Marker} from "react-map-gl";
import {FlyToInterpolator} from '@deck.gl/core';

const Cluster = ({cluster,points,classN,supercluster,viewport,setPopupInfo,setViewport,src,alt}) => {
    const [longitude, latitude] = cluster.geometry.coordinates
    const {cluster: isCluster, point_count: pointCount} = cluster.properties
        /* If not a single point, display the count of listings within that cluster */
        if (isCluster) {
            return (
                <Marker
                latitude= {latitude}
                longitude= {longitude}
                >
                <div
                    className={`${classN}`}
                    style={{
                    width:  `${10 + (pointCount / points.length) * 100}px`,
                    height: `${10 + (pointCount / points.length) * 100}px`
                    }}
                    onClick= {() => {
                    const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 20);
                    setViewport({
                        ...viewport,
                        latitude,
                        longitude,
                        zoom: expansionZoom,
                        transitionInterpolator: new FlyToInterpolator({speed: 2}),
                        transitionDuration: "auto",
                    })
                    }}
                >
                    {pointCount}
                </div>
                </Marker>
            )
        }
        /* If not a cluster, display a simple marker */
        return (
            <Marker
                longitude={longitude}
                latitude={latitude}
                anchor="bottom"
                onClick={(e) => {
                // If we let the click event propagates to the map, it will immediately close the popup
                // with `closeOnClick: true`
                e.originalEvent.stopPropagation();
                setPopupInfo(cluster);
                }}
            >
                <img
                src={src}
                height="20"
                alt={alt}
                />
            </Marker>
        )
    }
export default Cluster;