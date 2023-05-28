import './user-search-box.css'
import {Input} from "@mantine/core";

interface UserSearchBoxProps{
    placeHolder:string,
    onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const UserSearchBox = ({placeHolder,onChangeHandler}:UserSearchBoxProps) => {

    return (

        <div className="user-search-container">
            <Input
                type='search'
                placeholder={placeHolder}
                onChange={onChangeHandler}

            />
        </div>
    )

};

export default UserSearchBox;