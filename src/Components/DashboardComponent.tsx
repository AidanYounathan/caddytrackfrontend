
import React, { useEffect, useState } from 'react'
import defaultPFP from '../../public/defaultPFP.jpg'
import Image from 'next/image'
import { useAppContext } from '@/Context/Context'
import { useRouter } from 'next/navigation'
import { Button, Label, Modal, RangeSlider, TextInput } from "flowbite-react";
import ClubTrackerComponent from "./ClubTrackerComponent";
import { AddTracker, DeleteTracker, EditTracker, GetTrackers, GetUserData } from '@/DataServices/DataServices'
import { ITrackerModel, TrackerDTO } from '@/DataServices/Interfaces/Interfaces'

const DashboardComponent = () => {

    const data = useAppContext();

    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const [clubName, setClubName] = useState<string>('');
    const [stock, setStock] = useState<number>(0);
    const [max, setMax] = useState<number>(0);
    const [confidence, setConfidence] = useState<number>(5);
    const [editClubName, setEditClubName] = useState<string>('');
    const [editStock, setEditStock] = useState<number>(0);
    const [editMax, setEditMax] = useState<number>(0);
    const [editID, setEditID] = useState<number>(0);
    const [editConfidence, setEditConfidence] = useState<number>(5);

    const [errorMsg, setErrorMsg] = useState<string>("");

    function onCloseModal() {
        setConfidence(5);
        setClubName("");
        setStock(0);
        setMax(0);
        setOpenModal(false);
        setErrorMsg("");
    }

    function onCloseEditModal() {
        setEditClubName("");
        setEditConfidence(5);
        setEditMax(0);
        setEditStock(0);
        setOpenEditModal(false);
        setErrorMsg("");
    }

    async function addNewTracker() {

        if(clubName == ""){
            setErrorMsg("Please name your Club");
            return;
        }

        const newTracker:TrackerDTO = {
            name: clubName,
            stockYardage: stock,
            maxYardage: max,
            confidenceLevel: confidence
        }

        if(data.user != "" && await AddTracker(data.user, newTracker)){
            data.resetUserInfo();
            setOpenModal(false);
        }
        else{
            setErrorMsg("Your Club could not be added. Please try again.");
        }
    }

    function openEditTracker(name: string, max:number, stock:number, confidence:number, id:number){

        setEditClubName(name);
        setEditMax(max);
        setEditStock(stock);
        setEditConfidence(confidence);
        setEditID(id);

        setOpenEditModal(true);
    }

    async function editTracker(id:number) {

        if(editClubName == ""){
            setErrorMsg("Please name your Club");
            return;
        }

        const edit:TrackerDTO = {
            name: editClubName,
            stockYardage: editStock,
            maxYardage: editMax,
            confidenceLevel: editConfidence
        }

        if(data.user != "" && await EditTracker(data.user, id, edit)){
            data.resetUserInfo();
            onCloseEditModal();
        }
        else{
            setErrorMsg("Your Club could not be added. Please try again.");
        }

    }

    async function deleteTracker(id:number) {
        
        console.log(await DeleteTracker(data.user, id));
        data.resetUserInfo();
        onCloseEditModal();

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
                            <ClubTrackerComponent key={e.id} id={e.id} name={e.name} stock={e.stockYardage} max={e.maxYardage} confidence={e.confidenceLevel} openEditTracker={openEditTracker}></ClubTrackerComponent>
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
                        <p className='text-red-500'>{errorMsg}</p>
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
                        <p className='text-red-500'>{errorMsg}</p>
                        
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Stock/Average Yardage" />
                            </div>
                            <TextInput
                                id="name"
                                type="text"
                                placeholder="Enter Club Name"
                                value={editClubName}
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
                                value={editStock != 0 ? editStock : ''}
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
                                value={editMax != 0 ? editMax : ''}
                                required
                                onChange={(event) => setEditMax(Number(event.target.value))}
                            />
                        </div>

                        <div className="">
                            <Label htmlFor="default-range" value="Confidence Level" />
                            <div className="">
                                <RangeSlider max={10} min={1} defaultValue={5} value={editConfidence} id="default-range" onChange={(event) => { console.log(confidence), setEditConfidence(Number(event.target.value)) }} />
                                <p>{editConfidence}</p>
                            </div>
                            
                        </div>
                        
                        <div className="w-full flex space-x-4">
                            <Button onClick={() => {editTracker(editID)}}>Submit Club</Button>
                            <Button color="failure" onClick={() => {deleteTracker(editID)}}>Delete Club</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


            {/* End Edit Club Modal */}
        </div>
    );
};

export default DashboardComponent;
