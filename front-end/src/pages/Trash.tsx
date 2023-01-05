import useGetUserNotes, { Data } from "../api/hooks/getUserNotes";

const TrashBin = () => {
  const userNotes = useGetUserNotes();

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      {userNotes?.data?.map((note: Data) => {
        return (
          <div
            key={note.id}
            style={{
              width: "200px",
              height: "200px",
              fontSize: "10px",
              backgroundColor: "darkgray",
            }}
          >
            <h1>{note.title}</h1>
            <p>{note.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TrashBin;
