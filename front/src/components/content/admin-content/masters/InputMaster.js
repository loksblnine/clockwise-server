import React, {Fragment, useState} from "react";
import {SERVER_URL} from "../../../../constants";

const InputMaster = () => {
    const [master_name, setMasterName] = useState("")
    const [ranking, setRanking] = useState("")

    const onSubmitForm = async e => {
        e.preventDefault();

        try {
            const body = {master_name, ranking}
            await fetch(SERVER_URL+`/masters`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

        } catch (e) {
            console.log(e.message)
        }
    }
    return (
        <Fragment>
            <button type="button" className="btn btn-success" data-toggle="modal"
                    data-target="#addMaster">
                Добавить
            </button>

            <div className="modal fade" id="addMaster" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title" id="exampleModalLabel">Добавить мастера</h1>
                            <button type="button" className="close" data-dismiss="modal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input className="form-control" placeholder="Иван Иванович Иванов" value={master_name}
                                   onChange={e => setMasterName(e.target.value)}/>
                            <input className="form-control" placeholder="5.0" value={ranking}
                                   onChange={e => setRanking(e.target.value)}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                            <button type="button" className="btn btn-primary"
                                    onClick={e => onSubmitForm(e)}>Сохранить изменения
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default InputMaster;