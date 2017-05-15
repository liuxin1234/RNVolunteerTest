/**
 * Created by nbcei on 2017/3/24.
 */
import React, { Component } from 'react';

export default class NetUitl  {

    static  postFromTaken(url, data) {
        let params = "grant_type=client_credentials";
        var headers = new Headers();
        headers.append("Authorization", "Basic NWI5Mzk3N2QtNDJhNy00NmZlLTliNjktOTFkOWQwMTQyZmI2Ok1wVXVzR2dHNys2WERpVnRXalpZM1E9PQ==");
        headers.append("Cache-Control", "no-cache");
        var opts = {
            method: "POST",
            body: params,
            mode: "cors",
            headers: headers,
        };
        return new Promise((resolve,reject)=>{
            fetch('http://115.238.150.174:5019/token', opts)
                .then((response) => {
                    return response.json();
                })
                .then((responseJson) => {
                    var opts;
                    var access_token = responseJson.access_token;
                    var headers = new Headers();
                    headers.append("Authorization", "Bearer " + access_token);
                    headers.append("Content-Type", "application/json");

                    opts= {
                        method: "POST",
                        body: JSON.stringify(data),
                        type: 'json',
                        mode: "cors",
                        headers: headers
                    };
                    fetch(url, opts)
                        .then((response) => {
                            return response.json()
                        })
                        .then((responseJson) => {
                            resolve(responseJson)
                        })
                        .catch((error) => {
                            reject(error)
                        }).done();
                })
                .catch((error) => {
                }).done();
        })
    }


}
