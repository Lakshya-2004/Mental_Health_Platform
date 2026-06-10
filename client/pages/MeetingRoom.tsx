import { useParams } from "react-router-dom";

const MeetingRoom = () => {
  const { meetLink } = useParams();

  return (
    <div className="h-screen">
      <iframe
        src={decodeURIComponent(meetLink!)}
        className="w-full h-full"
        allow="camera; microphone; fullscreen"
      />
    </div>
  );
};

export default MeetingRoom;