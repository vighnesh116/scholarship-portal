function StudentForm(){
    return(
        <div class="container">
            <div class="form-box">
        <form>
            <input type="Text" placeholder="Enter YOur Nmae "/>
            <br/><br/>

            <input type="Number" placeholder="Enter Pertcentage"/>
            <br/><br/>

            <input type="number" placeholder="Enter Your family Income"/>
            <br/><br/>

            <select required>
                <option value=" "disabled selected>Category</option>
                <option value="general">General</option>
                <option value="obc">OBC</option>
                <option value="sc">SC</option>
                <option value="st">ST</option>
                <option value="minor">Minority</option>
            </select>
            <br/><br/>
            <select required>
                <option disabled selected>Select Your Class</option>
                <option value="11th">11th</option>
                <option value="12th">12th</option>
            
            </select>
            
            <br/><br/>

            <select required>
            <option disabled selected>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            </select>

            <br/><br/>

            <button type="Submit">Check Eligibility</button>
        </form>
        </div>
    </div>
    );
}
export default StudentForm;