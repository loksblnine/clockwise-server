import React, {Fragment, useState} from "react";
import {SERVER_URL} from "../../../../constants";

const InputCity = () => {
    const [city_name, setCityName] = useState("")

    const onSubmitForm = async e => {
        e.preventDefault();

        try {
            const body = {city_name}
            await fetch(SERVER_URL+`/cities`, {
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
                    data-target="#addTowm">
                Добавить
            </button>

            <div className="modal fade" id="addTowm" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title" id="exampleModalLabel">Добавить город</h1>
                            <button type="button" className="close" data-dismiss="modal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input className="form-control" placeholder="Город" value={city_name}
                                   onChange={e => setCityName(e.target.value)}/>
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
export default InputCity;