
import React, { useEffect, useState } from 'react'
import defaultPFP from '../../public/defaultPFP.jpg'
import Image from 'next/image'
import { useAppContext } from '@/Context/Context'
import { useRouter } from 'next/navigation'
import { Button, Label, Modal, RangeSlider, TextInput } from "flowbite-react";
import ClubTrackerComponent from "./ClubTrackerComponent";
import { AddTracker, GetTrackers, GetUserData } from '@/DataServices/DataServices'
import { ITrackerModel, TrackerDTO } from '@/DataServices/Interfaces/Interfaces'

const DashboardComponent = () => {

    const data = useAppContext();
    const router = useRouter();

    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const [clubName, setClubName] = useState<string>('');
    const [stock, setStock] = useState<number>(0);
    const [max, setMax] = useState<number>(0);
    const [confidence, setConfidence] = useState<number>(5);
    const [editClubName, setEditClubName] = useState<string>('');
    const [editStock, setEditStock] = useState<number>(0);
    const [editMax, setEditMax] = useState<number>(0);
    const [editConfidence, setEditConfidence] = useState<number>(5);

    function onCloseModal() {
        setOpenModal(false);
    }

    function onCloseEditModal() {
        setOpenModal(false);
    }

    async function addNewTracker() {

        const newTracker:TrackerDTO = {
            name: clubName,
            stockYardage: stock,
            maxYardage: max,
            confidenceLevel: confidence
        }

        if(data.user != "")
            console.log(await AddTracker(data.user, newTracker));
        data.resetUserInfo();
        setOpenModal(false);
    }

    return (
        <div>
            <div className=' flex justify-center mt-5'>
                <Button color="blue" onClick={() => setOpenModal(true)}>
                    Add Club
                </Button>
            </div>
            
            <div className="mx-[10%] mt-5 bg-[#d0d1d1] opacity-[98%] rounded-lg min-h-[50vh] lg:text-[40px] ">
                <div className="flex  justify-evenly pt-3">
                    <p>Club Name:</p>
                    <p>Stock Yardage:</p>
                    <p>Max Yardage:</p>
                    <p>Confidence Level:</p>
                    <p>Edit:</p>
                </div>
                <hr className=" h-[2px] bg-white" />

                {
                   (data.userInfo.trackers == null || data.userInfo.trackers.length == 0) ? <p className='text-center mt-3'>No Clubs added yet!</p> : data.userInfo.trackers.map(e => {
                        return(
                            <ClubTrackerComponent key={e.id} name={e.name} stock={e.stockYardage} max={e.maxYardage} confidence={e.confidenceLevel}></ClubTrackerComponent>
                        ); 
                   })
                }

            </div>

            {/* Add Club Modal */}
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Add A Club
                        </h3>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Club Name" />
                            </div>
                            <TextInput
                                id="name"
                                type="text"
                                placeholder="Enter Club Name"
                                onChange={(event) => setClubName(event.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="stock" value="Stock/Average Yardage" />
                            </div>
                            <TextInput
                                id="stock"
                                type="number"
                                pattern=" 0+\[0-9]*[1-9][0-9]*$"
                                maxLength={3}
                                placeholder="Enter Yardage Number"
                                onChange={(event) => setStock(Number(event.target.value))}
                                required
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="max" value="Max Yardage" />
                            </div>
                            <TextInput
                                id="max"
                                maxLength={3}
                                type="number"
                                placeholder="Enter Yardage Number"
                                pattern=" 0+\[0-9]*[1-9][0-9]*$"
                                required
                                onChange={(event) => setMax(Number(event.target.value))}
                            />
                        </div>

                        <div className="">
                            <Label htmlFor="default-range" value="Confidence Level" />
                            <div className="">
                                <RangeSlider max={10} min={1} defaultValue={5} id="default-range" onChange={(event) => { console.log(confidence), setConfidence(Number(event.target.value)) }} />
                                <p>{confidence}</p>
                            </div>
                            
                        </div>

                        <div className="w-full">
                            <Button onClick={addNewTracker}>Submit Club</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {/* End Add Club Modal */}

            {/* Edit Club Modal */}

            <Modal show={openEditModal} size="md" onClose={onCloseEditModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Add A Club
                        </h3>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Stock/Average Yardage" />
                            </div>
                            <TextInput
                                id="name"
                                type="text"
                                placeholder="Enter Club Name"
                                onChange={(event) => setEditClubName(event.target.value)}
                                required
                            />
                        </div>



                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="stock" value="Stock/Average Yardage" />
                            </div>
                            <TextInput
                                id="stock"
                                type="number"
                                pattern=" 0+\[0-9]*[1-9][0-9]*$"
                                maxLength={3}
                                placeholder="Enter Yardage Number"
                                onChange={(event) => setEditStock(Number(event.target.value))}
                                required
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="max" value="Max Yardage" />
                            </div>
                            <TextInput
                                id="max"
                                maxLength={3}
                                type="number"
                                placeholder="Enter Yardage Number"
                                pattern=" 0+\[0-9]*[1-9][0-9]*$"
                                required
                                onChange={(event) => setEditMax(Number(event.target.value))}
                            />
                        </div>

                        <div className="">
                            <Label htmlFor="default-range" value="Confidence Level" />
                            <div className="">
                                <RangeSlider max={10} min={1} defaultValue={5} id="default-range" onChange={(event) => { console.log(confidence), setEditConfidence(Number(event.target.value)) }} />
                                <p>{editConfidence}</p>
                            </div>
                            
                        </div>

                        <div className="w-full">
                            <Button>Submit Club</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


            {/* End Edit Club Modal */}
        </div>
    );
};

export default DashboardComponent;
