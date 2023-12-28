import { useEffect, useState } from 'react';
import axios from 'axios';
import { typeColors } from '@utilities/Colors';

const MoveCard = ({ move }) => {
      const [moveDetails, setMoveDetails] = useState(null);
      const moveName = move.name;
      const moveUrl = move.url;

      useEffect(() => {
            const fetchMoveDetails = async () => {
                  try {
                        const response = await axios.get(moveUrl);
                        setMoveDetails(response.data);
                  } catch (error) {
                        console.error(`Error fetching move details for ${moveName}:`, error);
                  }
            };

            fetchMoveDetails();
      }, [moveUrl, moveName]);



      const getMoveTypeColor = (type) => {

            return typeColors[type] || 'transparent';
      };

      const backgroundColor = getMoveTypeColor(moveDetails?.type?.name) || 'transparent';
      const backgroundImage =
            getMoveTypeColor(moveDetails?.type?.name) && getMoveTypeColor(moveDetails?.type?.name).length === 2
                  ? `linear-gradient(to bottom, ${getMoveTypeColor(moveDetails?.type?.name)[0]}, ${getMoveTypeColor(moveDetails?.type?.name)[1]})`
                  : 'transparent';

      return (
            <div
                  key={moveDetails?.id}
                  className="text-gray-900 font-medium rounded-lg text-lg px-3 py-0.5 me-2 mb-2 "
                  style={{
                        backgroundColor,
                        backgroundImage,
                  }}
            >
                  <h5 className='text-center text-xl font-bold' >{moveName.charAt(0).toUpperCase() + moveName.slice(1)}</h5>



            </div>
      );
};


export default MoveCard;