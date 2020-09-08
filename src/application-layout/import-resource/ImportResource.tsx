import React, {Fragment, FunctionComponent} from 'react'
import {useAuth0} from "@auth0/auth0-react";
import TextField from '@material-ui/core/TextField';
import {Button, Checkbox} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";
import SimpleTabs from "../components/tabs/tabs";
import http from "../../services/http";
import ReactJson from "react-json-view";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
    },
    flexContainer: {
        display: "flex",
        alignItems: "flex-start"
    },
    jsonContainer: {
        height: "621px",
        width: "100%",
        border: "1px solid gray",
        marginLeft: "16px"
    },
    fileMetadata: {
        display: "flex",
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.main,
    },
    metadata: {
        marginRight: "28px",
        fontSize: "12px",
        marginLeft: "28px",
        paddingTop: "6px",
        paddingBottom: "6px"
    },
    jsonObject: {
        overflowY: "scroll",
        height: "580px",
        width: "450px"
    },
    buttonsContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "48px",
    },
    submitButton: {
        marginRight: "4px"
    },
    dryRunButton:{
        marginRight: "4px",
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.contrastText
    },
    sourceTab: {
        height:"70px"
    },
    conversionTab:{
        height: "100px"
    }
}));

const ImportResource: FunctionComponent = () => {
    const {isLoading, user} = useAuth0();

    const classes = useStyles();
    const [currentfile, setCurrentfile] = React.useState({name: "", size: 0, type: ""});
    const [resource, setResource] = React.useState({
        conversionKey: "",
        conversionSchema: "",
        isDryRun: false,
        url: "",
        uploadedFile: null,
        json: null,
        data: ""
    })

    React.useEffect(() => {
        if (resource.uploadedFile !== null) {
            console.log("Changing fileupload", resource.uploadedFile);
            setCurrentfile(resource.uploadedFile ? resource.uploadedFile[0] : {name: "", size: 0, type: ""})
        }
    }, [resource.uploadedFile])


    const handleChange = (e: React.ChangeEvent<{}>) => {
        if (e.target.name === "uploadedFile") {
            if (e.target.files) {
                setResource({
                    ...resource,
                    [e.target.name]: e.target.files
                });
                handleFileChange(e);
            }
        } else {
            setResource({
                ...resource,
                [e.target.name]: e.target.value
            });
        }
    };

    if (isLoading || !user) {
        return <div>Loading...</div>;
    }

    const submitDryRun = function(){
        setResource({...resource, isDryRun: true})
        callImportResourceLambda();
    }

    const callImportResourceLambda = function () {
        console.log("submitting Resource", resource.json);
        if (resource.json) {


            http.post("https://q72kfs7g69.execute-api.us-east-1.amazonaws.com/dev/importResources", resource).then((response) => {

            })
            console.log("Response from Lambda", resource);
        }
    }

    const handleFileChange = (event: React.ChangeEvent<{}>) => {
        console.log("This is a file change event. Reading file...", event.target.files);

        var json = null;
        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            console.log("The file?", theFile)

            return function (e) {
                console.log('e readAsText = ', e);
                console.log('e readAsText target = ', e.target);
                try {
                    json = JSON.parse(e.target.result);
                    if (json) {

                        console.log("Data from file", JSON.stringify(json,
                            undefined, 4))
                        setResource({
                            ...resource,
                            // data: JSON.stringify(json),
                            json: json,
                        });
                    }
                    // alert('json global var has been set to parsed json of this file here it is unevaled = \n' + JSON.stringify(json));
                } catch (ex) {
                    alert('ex when trying to parse json = ' + ex);
                }
            }
        })(event.target.files[0]);
        reader.readAsText(event.target.files[0]);
    }

    return (
        <div data-testid='mobb-user-profile'>
            {(isLoading || !user) && <div>Loading...</div>}
            {(!isLoading && user) && <Fragment>
                <Typography><h1>Import Resource</h1></Typography>
                <form onSubmit={callImportResourceLambda()}>
                    <div className={classes.flexContainer}>
                        <div>
                            <SimpleTabs title="Source">
                                <div title="Upload File" className={classes.sourceTab}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                    >
                                        Upload File
                                        <input
                                            type="file"
                                            style={{display: "none"}}
                                            name="uploadedFile"
                                            onChange={(event) => handleChange(event)}
                                        />
                                    </Button>

                                </div>
                                <div title="URL" className={classes.sourceTab}>
                                    <TextField name="url" onChange={(event) => handleChange(event)} value={resource.url}
                                               id="outlined-basic" label="Source URL" variant="outlined"/>
                                </div>
                            </SimpleTabs>
                            <SimpleTabs title="Conversion">
                                <div title="Custom" className={classes.conversionTab}>
                                    <TextField name="conversionKey" onChange={(event) => handleChange(event)}
                                               value={resource.conversionKey} id="outlined-basic" label="Key Name"
                                               variant="outlined"/>
                                    <br/>
                                    <TextField name="conversionSchema" onChange={(event) => handleChange(event)}
                                               value={resource.conversionSchema} id="outlined-basic" label="Schema Name"
                                               variant="outlined"/>
                                    <br/>
                                </div>
                                <div title="Existing"className={classes.conversionTab}>
                                    Previous conversion
                                </div>
                            </SimpleTabs>
                            <div className={classes.buttonsContainer}>
                                <div>
                                    <Button className={classes.dryRunButton} variant="contained" type="button"  onClick={()=>submitDryRun()}>Dry Run</Button>
                                    <Button className={classes.submitButton} variant="contained" type="submit">Import</Button>

                                </div>
                            </div>
                        </div>
                        <div className={classes.jsonContainer}>
                            {currentfile.name !== "" && <div className={classes.fileMetadata}>

                                <div><Typography className={classes.metadata}>Filename: <b>{currentfile.name}</b></Typography></div>
                                <div><Typography className={classes.metadata}>Type: <b>{currentfile.type}</b></Typography></div>
                                <div><Typography className={classes.metadata}>Size: <b>{currentfile.size}</b></Typography></div>
                            </div>}
                            {currentfile.name !== "" && <div className={classes.jsonObject}>
                                <ReactJson src={resource.json || {}}/>
                            </div>}
                        </div>
                    </div>
                </form>

            </Fragment>}
        </div>
    );
};

export default ImportResource;