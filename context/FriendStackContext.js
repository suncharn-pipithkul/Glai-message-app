import React, { createContext, useState } from 'react';

export const FriendStackContext = createContext();

export const FriendStackContextProvider = ({ children }) => {
    const [isAddFriend, setIsAddFriend] = useState(undefined);

    const val = {isAddFriend, setIsAddFriend};
    return (
        <FriendStackContext.Provider value={val}>
            {children}
        </FriendStackContext.Provider>
    )
};