import './Employee.css';

function Employee(props) {
    const { id, image, name } = props;

    return (
        <div className="employee-div">
            <div className="image-div">
                <img src={image} alt={name}/>
            </div>
            <div className="details-div">
                <p>Name: {name}</p>
            </div>
       </div>
    )
}

export default Employee;