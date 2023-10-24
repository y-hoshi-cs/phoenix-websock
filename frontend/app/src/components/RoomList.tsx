import { Room } from '../api/rest/rooms';

type Props = {
  rooms: Room[];
  onClickRow: (rowId: string) => void;
};

const RoomList = ({ rooms, onClickRow }: Props) => {
  return (
    <div className={`overflow-y-scroll hidden-scrollbar border-r w-[250px]`}>
      <div>
        <ul>
          {rooms.map((room) => {
            return (
              <li
                key={room.id}
                className="border-b border-1 px-4 py-2 hover:bg-slate-200 dark:hover:bg-teal-900 cursor-pointer"
              >
                <div onClick={() => onClickRow(room.id)}>
                  <div className="flex">
                    <span className="font-bold flex-1">{room.name}</span>
                  </div>

                  <ul className="flex space-x-2 truncate text-ellipsis"></ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RoomList;
