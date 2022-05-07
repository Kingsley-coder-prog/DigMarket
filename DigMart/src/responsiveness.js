import {css} from "styled-components"

export const mobilesmall = (props) => {
    
    return css`
    @media only screen and (max-width: 375px){
     ${props}
   }
    `;
};

export const tablet = (props) => {
    
    return css`
    @media only screen and (max-width: 955px){
     ${props}
   }
    `;
};

export const mobile = (props) => {
    
    return css`
    @media only screen and (max-width: 592px){
     ${props}
   }
    `;
};



