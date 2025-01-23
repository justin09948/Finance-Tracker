import styles from '../styles/TransactionItem.module.css'
import { deleteExpense } from '../app'

function TransactionItem(props){
    const deleteExpenses = async() => {
        const response = await deleteExpense(props.id)
        if (response === 200){
            props.refreshList()
            props.onDelete(true)
        }
        props.onDelete(false)
    }

    const handleCatIcon = (props) => {
        switch (props.category){
            case "Food":
                return(<span className={`material-symbols-outlined ${styles.food}`} >Restaurant</span>)
            case "Entertainment":
                return(<span className={`material-symbols-outlined ${styles.entertainment}`}>Tv</span>)
            case "Transportation":
                return(<span className={`material-symbols-outlined ${styles.transportation}`}>Train</span>)
            case "Health":
                return(<span className={`material-symbols-outlined ${styles.health}`}>Favorite</span>)
            default:
                return(<span className={`material-symbols-outlined ${styles.other}`}>More_Horiz</span>)
        }
    }
    const IconDisplay = ({ category }) => {
        let containerClass;
        switch (category) {
            case "Food":
                containerClass = styles.food_container;
                break;
            case "Entertainment":
                containerClass = styles.entertainment_container;
                break;
            case "Transportation":
                containerClass = styles.transportation_container;
                break;
            case "Health":
                containerClass = styles.health_container;
                break;
            default:
                containerClass = styles.other_container;
                break;
        }
        return (
            <div className= {containerClass}>
                {handleCatIcon({ category })}
            </div>
        );
    };
    return(
        <div className={styles.body}>
            <div className={styles.nameDisplay}> 
                <IconDisplay category={props.category}></IconDisplay>
                <h1 className={styles.h1}>{props.name}</h1>
            </div>
            <div className={styles.amount_container}>
                <h1 className={styles.h1}>${props.amount}</h1>
                <button className={styles.delete_button} onClick={deleteExpenses}>
                    <span className='material-symbols-outlined'>delete</span>
                </button>
            </div>
        </div>
    )
}

export default TransactionItem