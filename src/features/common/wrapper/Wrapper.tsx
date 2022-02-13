import cn from 'classnames'
import style from "./Wrapper.module.sass"

const Wrapper = ({children, className }) => {

    const compoundClasses = cn (style.template, className)
    return (
        <div className={compoundClasses}>
            {children}
        </div>
    );
};

export default Wrapper;