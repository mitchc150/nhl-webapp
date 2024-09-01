import React, { useEffect } from 'react';

const Games: React.FC = () => {
    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const response = await fetch('/api/basicGameDataByDate');
                const data = await response.json();
                console.log('Game data:', data);
            } catch (error) {
                console.error('Error fetching game data:', error);
            }
        };

        fetchGameData();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <div>Hello world! I am the scores page.</div>
    );
};

export default Games;