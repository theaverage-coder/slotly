import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import './booking.css';
import Logo from './Logo.jpg';
import { useNavigate } from 'react-router-dom';



const CreateBooking = () => {
    const navigate = useNavigate();

    //Default availabilities and time slots for each day of the week
    const [availabilities, modifyAvailabilities] = useState({
        MONDAY: { isChecked: false, timeSlots: [] },
        TUESDAY: { isChecked: false, timeSlots: [] },
        WEDNESDAY: { isChecked: false, timeSlots: [] },
        THURSDAY: { isChecked: false, timeSlots: [] },
        FRIDAY: { isChecked: false, timeSlots: [] },
        SATURDAY: { isChecked: false, timeSlots: [] },
        SUNDAY: { isChecked: false, timeSlots: [] },
    });
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [exceptions, setExceptions] = useState(['']);
    const [generatedLink, setGeneratedLink] = useState(['']);
    const [alreadyClicked, setAlreadyClicked] = useState(false);

    //user authentication
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const decoded = jwtDecode(token);

        } catch (err) {
            localStorage.removeItem('token');
            navigate('/login')
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        for (let char of name) {
            const isLetter = (char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z');
            const isSpace = char === ' ';

            if (!isLetter && !isSpace) {
                alert("Invalid name. Name must contain only letters and spaces.");
                return;
            }
        }

        if (new Date(startDate) > new Date(endDate)) {
            alert("Invalid inputted dates.");
            return;
        }

        const inputs = {
            name,
            startDate,
            endDate,
            location,
            availabilities,
            exceptions
        }

        try {
            const response = await fetch('https://sentinels-booking.onrender.com/booking-api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs), // Send the combined form data to the backend
            });

            const result = await response.json();

            if (response.ok) {
                alert('Booking Created!');
                setGeneratedLink(result.uniqueUrl);
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting the form');
        }

        setAlreadyClicked(true);
    }


    //Update availabilities when a day is checked off
    const handleDayUpdate = (day, checked) => {
        //If a day has been checked off -> add a time slot, otherwise, set timeslots to an empty array (remove any previous ones)
        modifyAvailabilities((prev) => {
            const updated = { ...prev };
            updated[day].isChecked = checked;
            if (updated[day].isChecked) {
                updated[day].timeSlots = [{ start: '', end: '' }];
            }
            else {
                updated[day].timeSlots = [];
            }
            console.log("Updated Availabilities:", updated);
            return updated;
        });
    };

    //=====================================CHECKS==============================================================================
    //Add a new time slot
    //Check that there are no duplicates
    //Default times for each new time slot
    //Deleting extra time slots 
    //Start time must be before end time
    //Cannot add a time slot to a date that has not been checked first
    //If a date is checked and time slots are added -> then later unchecked? ->before adding to database, just check which days are checked first and only add
    //the time slots for those

    const handleTimeSlots = (day, type, value, index) => {
        console.log('Changing slot for', day, 'at index:', index, 'to value:', type, value);
        modifyAvailabilities((prev) => ({
            ...prev,
            [day]: {
                ...prev[day], timeSlots: prev[day].timeSlots.map((slot, i) =>
                    i === index ? { ...slot, [type]: value } : slot)
            }
        }));
    };

    const handleAddTimeSlot = (day) => {
        modifyAvailabilities((prev) => {
            const updated = { ...prev };
            if (updated[day].timeSlots.length === 0) {
                updated[day].isChecked = true;
            }
            updated[day].timeSlots = [...updated[day].timeSlots, { start: '', end: '' }];
            return updated;
        });
    };

    const handleExceptions = (date, index) => {
        console.log('Changing exception at index:', index, 'to:', date);
        const updated = [...exceptions];
        updated[index] = date;
        setExceptions(updated);
    };

    const handleDeleteException = (index) => {
        console.log('Deleting exception at index:', index);
        const updated = exceptions.filter((_, i) => i !== index);
        setExceptions(updated);
    };

    const handleAddExceptionDate = () => {
        console.log('Adding exception at index', exceptions.length);
        setExceptions((prev) => [...prev, '']);
    };

    const handleDeleteTimeSlot = (day, index) => {
        modifyAvailabilities((prev) => {
            const updated = { ...prev };
            const newTimeSlots = updated[day].timeSlots.filter((_, i) => i !== index);
            if (newTimeSlots.length === 0) {
                updated[day].isChecked = false;
            }
            updated[day].timeSlots = newTimeSlots;
            return updated;

        });
        /*modifyAvailabilities((prev) => ({
            ...prev,
            [day]: {...prev[day], timeSlots: prev[day].timeSlots.filter((_,i) => i !== index)},
        }));*/
    };