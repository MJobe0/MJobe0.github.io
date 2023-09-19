import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import './DiffFormProps.css';
//import DiffFormProps from "./DiffFormProps";
import ReactJsonViewCompare from "react-json-view-compare"



const JF = window.JF;

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
            "required": "Yes",
            "shrink": "No",
            "size": "50",
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

    var usersForms

    JF.getForms(function (response) {
        usersForms = response
        // console.log(response)
        return response
    });

    // console.log("uform ", usersForms)

    function isNumeric(num) {
        console.log(isNaN(num))
        return isNaN(num)
    }

    const [differences, setDifferences] = useState([]);

    function compareObjects(sourceObj, targetObj, path = '') {
        console.log("1typeof", typeof sourceObj)
        console.log("2typeof", typeof targetObj)
        console.log(path)
        for (const key in sourceObj) {
            const value1 = sourceObj[key];
            const value2 = targetObj[key];
            console.log("KEY", key)
            console.log("KEY TYPE", typeof key)

            if (typeof value1 === 'object' && typeof value2 === 'object') {
                compareObjects(value1, value2, `${path}.${key}`);
            } else if (value1 !== value2) {
                if (isNumeric(key)) {
                    var toplevelPath = key
                }
                const diff = {
                    path: `${path}.${key}`,
                    key: key,
                    oldValue: value1,
                    newValue: value2,
                    toplevelPath: toplevelPath
                };
                console.log(differences)
                setDifferences((prevDifferences) => [...prevDifferences, diff]);
                console.log(differences)
            }
        }
    }

    // const [renDiff, setRenDiff] = useState(false);

    const [sourceFormId, setSourceFormId] = useState({}); //rename
    const [targetFormId, setTargetFormId] = useState({}); //rename

    const [sourceSelection, setSourceSelection] = useState("Select Source Form");
    const handleSourceSelect = (e) => {
        e = JSON.parse(e);
        setSourceSelection(e.title);
        JF.getFormQuestions(String(e.id), function (response) {
            setSourceFormId(response);
        });
    }

    const [targetSelection, setTargetSelection] = useState("Select Target Form");
    const handleTargetSelect = (e) => {
        e = JSON.parse(e);
        console.log(e);
        setTargetSelection(e.title);
        JF.getFormQuestions(String(e.id), function (response) {
            setTargetFormId(response);
        });
    }

    const loggedInUser = localStorage.getItem("authenticated");

    if (!loggedInUser) {
        console.log("Home Here 1", loggedInUser)
        return <Navigate replace to="/login" />;
    } else {
        // console.log("Home Here 2");
        return (
            <>
                <div className="container mx-auto p-6 grid grid-cols-2 gap-4">
                    <div className="col-span-1 flex flex-col bg-white border-2 p-4">
                        <h2 className="mb-2 font-bold text-2xl">
                            Source Form
                        </h2>
                        <p className="text-md text-justify">Some Description</p>
                        <div className="flex flex-wrap mt-auto pt-3 text-xs">
                            <DropdownButton
                                title={sourceSelection ? sourceSelection : "Select Source Form"}
                                id="dropdown-menu-align-right"
                                onSelect={handleSourceSelect}
                            >
                                {usersForms?.map((uForm, index) => (
                                    <Dropdown.Item eventKey={JSON.stringify(uForm)}>{uForm.title}</Dropdown.Item>
                                ))}
                            </DropdownButton>
                        </div>
                    </div>
                    <div className="col-span-1 flex flex-col bg-white border-2 p-4">
                        <h2 className="mb-2 font-bold text-2xl">
                            Target Form
                        </h2>
                        <p className="text-md text-justify">Some Description</p>
                        <div className="flex flex-wrap mt-auto pt-3 text-xs">
                            <DropdownButton
                                title={targetSelection ? targetSelection : "Select Target Form"}
                                id="dropdown-menu-align-right"
                                onSelect={handleTargetSelect}
                            >
                                {usersForms?.map((uForm, index) => (
                                    <Dropdown.Item eventKey={JSON.stringify(uForm)}>{uForm.title}</Dropdown.Item>
                                ))}
                            </DropdownButton>
                        </div>
                    </div>
                </div>
                <div className=" row d-flex justify-content-center align-content-center">
                    <div className="github-diff">
                        <ul>
                            {differences.map((diff, index) => (
                                <>
                                    <h1>{"question" + diff.path}</h1>
                                    <li key={index}>
                                        <div className="github-diff-line">
                                            <span className="github-diff-line-num">{index}</span>
                                            <span className="github-diff-line-code">
                                                {/* <h5>{diff.key}</h5> */}
                                                <span className="github-diff-line-code-old">{diff.oldValue}</span>
                                                <span className="github-diff-line-code-new">{diff.newValue}</span>
                                            </span>
                                        </div>
                                    </li>
                                </>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* <div className=" row d-flex justify-content-center align-content-center">
                    {sourceSelection !== "Select Source Form" && targetSelection !== "Select Target Form" ? <button onClick={() => { setDifferences([]); compareObjects(sourceFormId, targetFormId); }} href="#" className="btn btn-primary col-3">Compare</button> : ""}
                </div> */}
                <div>
                    <ReactJsonViewCompare oldData={sourceFormId} newData={targetFormId} />;
                </div>
            </>
        );
    }
};

export default Home;