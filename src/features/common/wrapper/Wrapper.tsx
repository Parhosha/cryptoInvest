import * as React from 'react'
import cn from 'classnames'
import style from "./Wrapper.module.sass"

interface IWrap  { 
    children: React.ReactNode;
    className: string;
 }


const Wrapper = ({children, className }: IWrap) => {

    const compoundClasses = cn (style.template, className)
    return (
        <div className={compoundClasses}>
            {children}
        </div>
    );
};

export default Wrapper;