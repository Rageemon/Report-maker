import {ENDPOINT_URL} from "../constants/constant"


export const login = async (credentials) => {
    try {
        const res = await fetch(`${ENDPOINT_URL}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        return await res.json();
    } catch (error) {
        console.log('Error logging in:', error)
        console.log(ENDPOINT_URL)
        return { success: false, message: ENDPOINT_URL }
    }
};

export const createEvent = async (eventData) => {
    try {
        const res = await fetch(`${ENDPOINT_URL}/events`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        });
        return await res.json();
    } catch (error) {
        console.error('Error creating event:', error);
        return { success: false, message: 'Event creation failed' }
    }
};

export const getAllEvents = async () => {
    try {
        const res = await fetch(`${ENDPOINT_URL}/events`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        return await res.json();
    } catch (error) {
        console.error('Error fetching events:', error);
        return { success: false, message: 'Failed to fetch events' }
    }
};


export const getEventById = async (id) => {
    try {
        const res = await fetch(`${ENDPOINT_URL}/events/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        return await res.json();
    } catch (error) {
        console.error('Error fetching event:', error);
        return { success: false, message: 'Failed to fetch event' };
    }
};

export const updateEvent = async (id, eventData) => {
    try {
        const res = await fetch(`${ENDPOINT_URL}/events/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        });
        return await res.json()
    } catch (error) {
        console.error('Error updating event:', error);
        return { success: false, message: 'Failed to update event' }
    }
};

export const deleteEvent = async (id) => {
    try {
        console.log(`${ENDPOINT_URL}/events/${id}`)
        const res = await fetch(`${ENDPOINT_URL}/events/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        return await res.json();
    } catch (error) {
        console.error('Error deleting event:', error);
        return { success: false, message: 'Failed to delete event' }
    }
};