import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import DiffFormProps from "./DiffFormProps";

var obj1 =
{
    "responseCode": 200,
    "message": "success",
    "content": {
        "1": {
            "hint": " ",
            "labelAlign": "Auto",
            "name": "textboxExample1",
            "order": "1",
            "qid": "1",
            "readonly": "No",
            "required": "No",
            "shrink": "No",
            "size": "20",
            "text": "Textbox Example",
            "type": "control_textbox",
            "validation": "None"
        },
        "2": {
            "labelAlign": "Auto",
            "middle": "No",
            "name": "fullName2",
            "order": "1",
            "prefix": "No",
            "qid": "2",
            "readonly": "No",
            "required": "No",
            "shrink": "Yes",
            "sublabels":
            {
                "prefix": "Prefix",
                "first": "First Name",
                "middle": "Middle Name",
                "last": "Last Name",
                "suffix": "Suffix"
            },
            "suffix": "No",
            "text": "Full Name",
            "type": "control_fullname"
        },
        "3": {
            "cols": "40",
            "entryLimit": "None-0",
            "labelAlign": "Auto",
            "name": "yourMessage",
            "order": "3",
            "qid": "3",
            "required": "No",
            "rows": "6",
            "text": "Your Message",
            "type": "control_textarea",
            "validation": "None"
        }
    },
    "limit-left": 4982
};

var obj2 =
{
    "responseCode": 200,
    "message": "success",
    "content": {
        "1": {
            "hint": " ",
            "labelAlign": "Auto",
            "name": "textboxExample1",
            "order": "1",
            "qid": "1",
            "readonly": "No",
            "required": "No",
            "shrink": "No",
            "size": "20",
            "text": "Textbox Example",
            "type": "control_textbox",
            "validation": "None"
        },
        "2": {
            "labelAlign": "Auto",
            "middle": "No",
            "name": "fullName",
            "order": "1",
            "prefix": "No",
            "qid": "2",
            "readonly": "No",
            "required": "No",
            "shrink": "Yes",
            "sublabels":
            {
                "prefix": "Prefix",
                "first": "First Name",
                "middle": "Middle Name",
                "last": "Last Name",
                "suffix": "Suffix"
            },
            "suffix": "No",
            "text": "Full Name",
            "type": "control_fullname"
        },
        "3": {
            "cols": "40",
            "entryLimit": "None-0",
            "labelAlign": "Auto",
            "name": "yourMessage",
            "order": "3",
            "qid": "3",
            "required": "No",
            "rows": "6",
            "text": "YourMessage",
            "type": "control_textarea",
            "validation": "None"
        }
    },
    "limit-left": 4982
};

const Home = () => {
    // const [authenticated, setauthenticated] = useState(null);

    // useEffect(() => {
    //     const loggedInUser = localStorage.getItem("authenticated");
    //     console.log("Auth", loggedInUser)
    //     if (loggedInUser) {
    //         setauthenticated(loggedInUser);
    //     }
    // }, []);

    const [renDiff, setRenDiff] = useState(false);

    const [sourceSelection, setSourceSelection] = useState("Select Source Form");
    const handleSourceSelect = (e) => {
        console.log(e);
        setSourceSelection(e)
    }

    const [targetSelection, setTargetSelection] = useState("Select Target Form");
    const handleTargetSelect = (e) => {
        console.log(e);
        setTargetSelection(e)
    }

    const loggedInUser = localStorage.getItem("authenticated");

    if (!loggedInUser) {
        console.log("Home Here 1", loggedInUser)
        return <Navigate replace to="/login" />;
    } else {
        console.log("Home Here 2");
        return (
            <>
                <div class="container mx-auto p-6 grid grid-cols-2 gap-4">
                    <div class="col-span-1 flex flex-col bg-white border-2 p-4">
                        <h2 class="mb-2 font-bold text-2xl">
                            Source Form
                        </h2>
                        <p class="text-md text-justify">Some Description</p>
                        <div class="flex flex-wrap mt-auto pt-3 text-xs">
                            <DropdownButton
                                alignRight
                                title={sourceSelection ? sourceSelection : "Select Source Form"}
                                id="dropdown-menu-align-right"
                                onSelect={handleSourceSelect}
                            >
                                <Dropdown.Item eventKey="option-1">option-1</Dropdown.Item>
                                <Dropdown.Item eventKey="option-2">option-2</Dropdown.Item>
                                <Dropdown.Item eventKey="option-3">option 3</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </div>
                    <div class="col-span-1 flex flex-col bg-white border-2 p-4">
                        <h2 class="mb-2 font-bold text-2xl">
                            Target Form
                        </h2>
                        <p class="text-md text-justify">Some Description</p>
                        <div class="flex flex-wrap mt-auto pt-3 text-xs">
                            <DropdownButton
                                alignRight
                                title={targetSelection ? targetSelection : "Select Target Form"}
                                id="dropdown-menu-align-right"
                                onSelect={handleTargetSelect}
                            >
                                <Dropdown.Item eventKey="option-1">option-1</Dropdown.Item>
                                <Dropdown.Item eventKey="option-2">option-2</Dropdown.Item>
                                <Dropdown.Item eventKey="option-3">option 3</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </div>
                </div>
                <div class=" row d-flex justify-content-center align-content-center">
                    {renDiff ? <DiffFormProps originalObject={obj1.content} modifiedObject={obj2.content} ></DiffFormProps> : ""}
                </div>
                <div class=" row d-flex justify-content-center align-content-center">
                    { sourceSelection !== "Select Source Form" && targetSelection !== "Select Target Form" ? <button onClick={() => { setRenDiff(true) }} href="#" class="btn btn-primary col-3">Compare</button> : ""}
                </div>

            </>
        );
    }
};

export default Home;