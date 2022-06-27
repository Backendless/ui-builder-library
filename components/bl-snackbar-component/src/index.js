import {useState, useEffect, useCallback} from "react";
import {Action} from './components/button';
import {setHorizontal, setVertical} from './utils/position';
import {setType} from './utils/type';

export default function Snackbar({component, eventHandlers}) {
    const [visible, setVisible] = useState(false);
    const [classes, setClasses] = useState('snackbar');
    const [icon, setIcon] = useState();

    const {
        snackContent,
        autoHide,
        horizontalPosition,
        verticalPosition,
        type,
        showClose,
        showAction,
        actionContent,
    } = component;

    const {
        onClose,
        onAction,
    } = eventHandlers;

    useEffect(() => {
        if (component.show) {
            setVisible(true);
            component.show = false;
        }
    }, [component.show]);

    useEffect(() => {
        if (visible) {
            setClasses(prev => `${prev} snackbar__show`);
        } else {
            setClasses(prev => prev.replace('snackbar__show', ''));
        }
    }, [visible]);

    useEffect(() => {
        setClasses(prev => {
            const horizontal = setHorizontal(horizontalPosition);
            const vertical = setVertical(verticalPosition);
            return prev + horizontal + vertical;
        });

        if (type) {
            setClasses(prev => `${prev} ${type.toLowerCase()}`);
        }

        setIcon(setType(type));
    }, []);

    useEffect(() => {
        if (autoHide > 0) {
            if (visible) {
                setTimeout(() => {
                    setVisible(false);
                }, autoHide);
            }
        }
    }, [visible]);

    const close = useCallback(() => {
        setVisible(false);

        if (onClose) {
            onClose();
        }
    }, [onClose]);

    return (
        <div
            className={classes}
        >
            <div className="text">
                {icon}
                {snackContent}
            </div>
            <div>
                {
                    showAction && (
                        <Action
                            className={"action"}
                            onFunction={onAction}
                            content={actionContent}
                        />
                    )
                }
                {
                    showClose && (
                        <Action
                            className={"close"}
                            onFunction={close}
                            content={"X"}
                        />
                    )
                }
            </div>
        </div>
    );
}
