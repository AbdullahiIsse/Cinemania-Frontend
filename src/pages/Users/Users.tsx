import {ChangeEvent, useContext, useEffect, useState} from "react";
import {UserContext} from "../../Context/UserContext.tsx";
import UsersList from "../../components/Users/Users-list.tsx";
import UserSearchBox from "../../components/user-search-box/user-search-box.tsx";


const Users = () => {
    const {currentUser, userList} = useContext(UserContext)
    const [searchField, setSearchField] = useState('');
    const [filteredUserList, setFilteredUserList] = useState(userList);
    
    useEffect(()=> {
        
        const newUserList = userList.filter((user) => {
            return user.email.toLocaleLowerCase().includes(searchField) || user.displayName.toLocaleLowerCase().includes(searchField)
        })
        setFilteredUserList(newUserList)
    },[searchField, userList])

    const onSearchChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const searchFieldString = event.target.value.toLocaleLowerCase()
        setSearchField(searchFieldString)
    }
    return (<div>
        {
            currentUser === null ? <h1> Sign up to view this page </h1> : (
                <div>
                    <UserSearchBox placeHolder={"Search For Users"} onChangeHandler={onSearchChangeHandler}/>
                    <br/>
                    <div>Sign in as {currentUser.email}</div>
                    <br/>
                    <UsersList data={filteredUserList}/>
                </div>


            )
        }
    </div>)

};

export default Users;