export const saveWaterData = (waterAmount, recordingTime) => {
  return async dispatch => {
    try {
      const response = await fetch('project-digital-team.vercel.app', {
        method: 'POST',
        body: JSON.stringify({ waterAmount, recordingTime }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        dispatch({ type: 'SAVE_WATER_SUCCESS' });
      } else {
        throw new Error('Error sending data to server');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
};
