function StudentForm(){
    return(
        <form>
            <input type="Text" placeholder="Enter YOur Nmae "/>
            <br/><br/>

            <input type="Number" placeholder="Enter Pertcentage"/>
            <br/><br/>

            <input type="number" placeholder="Enter Your family Income"/>
            <br/><br/>

            <select>
                <option>Male</option>
                <option>Female</option>
            </select>
            <br/><br/>

            <button type="Submit">Check Eligibility</button>
        </form>
    );
}
export default StudentForm;