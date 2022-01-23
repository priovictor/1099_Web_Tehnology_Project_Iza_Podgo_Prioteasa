import {useState, useEffect} from 'react';
import {get, remove} from '../Calls';
import {Button, Paper, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {activityRoute} from '../ApiRoutes';
import { useNavigate } from 'react-router-dom';

export default function ActivityList(){
    
    const [rows, setRows] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(false);
    const navigate = useNavigate();

    useEffect(async () => {
        let data = await get(activityRoute);
        setRows(data);
    }, [needUpdate]);

    const deleteActivity = async(id, index) => {
        await remove(activityRoute, id);

        rows.splice(index, 1);
        setRows(rows);
        setNeedUpdate(!needUpdate);
    }

    return(
        <div>

            <div>
                <Button
                    variant='contained'
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => {navigate("AddActivity")}}
                >
                    Add new Activity
                </Button>
            </div>

            <br/>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Activity Id</TableCell>
                            <TableCell align="right">Activity Id</TableCell>
                            <TableCell align="right">Activity Name</TableCell>
                            <TableCell align="right">Activity UniqueCode</TableCell>
                            <TableCell align="right">Activity Date</TableCell>
                            <TableCell align="right">Activity Description</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.ActivityId}>
                                <TableCell component="th" scope="row">
                                    {row.ActivityId}
                                </TableCell>
                                <TableCell align='right'>{row.ActivityId}</TableCell>
                                <TableCell align='right'>{row.ActivityName}</TableCell>
                                <TableCell align='right'>{row.ActivityUniqueCode}</TableCell>
                                <TableCell align='right'>{row.ActivityDate}</TableCell>
                                <TableCell align='right'>{row.ActivityDescription}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => navigate(`/AddActivity/${row.ActivityId}`)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => deleteActivity(row.ActivityId, index)}>
                                        <DeleteIcon color="secondary" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}