const dotenv = require('dotenv');
const Pool = require('pg').Pool //Pool manages a dynamic list/pool of Client objects, with automatic re-connect functionality
const format = require('pg-format');
const fastcsv = require("fast-csv");

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const getUserInitialData = async (request, response) => {
    const version = request.params.version

    const experimentCount = await pool.query('SELECT * FROM view_participants_count')
    const navScreens = await pool.query('SELECT * FROM view_screens_x_version where version_name=$1', [version])

    const result = { experimentCount: experimentCount.rows, screens: navScreens.rows }
    // console.log(result)
    response.status(200).json(result)
}

const getVersions = (request, response) => {
    pool.query('SELECT * FROM view_experiment_versions', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM view_userform_results order by created_at desc', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPSFormData = (request, response) => {
    const sex = request.params.sex

    pool.query('SELECT * FROM view_psform_en WHERE sex = $1', [sex], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getAppTextData = (request, response) => {
    const sex = request.params.sex

    pool.query('SELECT * from view_text_x_screens WHERE sex = $1', [sex], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getMemoryTaskResult = (request, response) => {
    pool.query('SELECT * from view_visual_pattern_results', (error, results) => {
        if (error) {
            throw error
        }

        const jsonData = JSON.parse(JSON.stringify(results.rows));

        response.header('Content-Type', 'text/csv');
        response.attachment('memory_task_result.csv');
        fastcsv
            .write(jsonData, { headers: true })
            .pipe(response)
            .on("finish", function () {
                console.log("Write to CSV completed successfully!");
            });
    })
}

const getMemoryTaskResultPerUser = (request, response) => {
    const userId = request.params.userId

    pool.query('SELECT * from view_visual_pattern_results where user_id = $1', [userId], (error, results) => {
        if (error) {
            throw error
        }

        const jsonData = JSON.parse(JSON.stringify(results.rows));

        response.header('Content-Type', 'text/csv');
        response.attachment('memory_task_result_' + userId + '.csv');
        fastcsv
            .write(jsonData, { headers: true })
            .pipe(response)
            .on("finish", function () {
                console.log("Write to CSV completed successfully!");
            });
    })
}

const getBargainsResult = (request, response) => {
    pool.query('SELECT * from view_bargain_results_complete', (error, results) => {
        if (error) {
            throw error
        }

        const jsonData = JSON.parse(JSON.stringify(results.rows));

        response.header('Content-Type', 'text/csv');
        response.attachment('bargains_result.csv');
        fastcsv
            .write(jsonData, { headers: true })
            .pipe(response)
            .on("finish", function () {
                console.log("Write to CSV completed successfully!");
            });
    })
}

const getBargainsResultPerUser = (request, response) => {
    const userId = request.params.userId

    pool.query('SELECT * from view_bargain_results_complete where user_id = $1', [userId], (error, results) => {
        if (error) {
            throw error
        }

        const jsonData = JSON.parse(JSON.stringify(results.rows));

        response.header('Content-Type', 'text/csv');
        response.attachment('bargains_result_' + userId + '.csv');
        fastcsv
            .write(jsonData, { headers: true })
            .pipe(response)
            .on("finish", function () {
                console.log("Write to CSV completed successfully!");
            });
    })
}

const getBargainsResultPerStore = (request, response) => {
    pool.query('SELECT * from view_bargain_results_per_store', (error, results) => {
        if (error) {
            throw error
        }

        const jsonData = JSON.parse(JSON.stringify(results.rows));

        response.header('Content-Type', 'text/csv');
        response.attachment('bargains_result_per_store.csv');
        fastcsv
            .write(jsonData, { headers: true })
            .pipe(response)
            .on("finish", function () {
                console.log("Write to CSV completed successfully!");
            });
    })
}

const getBargainsResultPerStorePerUser = (request, response) => {
    const userId = request.params.userId

    pool.query('SELECT * from view_bargain_results_per_store where user_id = $1', [userId], (error, results) => {
        if (error) {
            throw error
        }

        const jsonData = JSON.parse(JSON.stringify(results.rows));

        response.header('Content-Type', 'text/csv');
        response.attachment('bargains_result_per_store_' + userId + '.csv');
        fastcsv
            .write(jsonData, { headers: true })
            .pipe(response)
            .on("finish", function () {
                console.log("Write to CSV completed successfully!");
            });
    })
}

const getPSFormResults = (request, response) => {
    pool.query('SELECT * FROM view_psform_results', (error, results) => {
        if (error) {
            throw error
        }
        const jsonData = JSON.parse(JSON.stringify(results.rows));

        response.header('Content-Type', 'text/csv');
        response.attachment('survey_result.csv');
        fastcsv
            .write(jsonData, { headers: true })
            .pipe(response)
            .on("finish", function () {
                console.log("Write to CSV completed successfully!");
            });
    })
}

const getPSFormResultsPerUser = (request, response) => {
    const userId = request.params.userId

    pool.query('SELECT * FROM view_psform_results where user_id = $1', [userId], (error, results) => {
        if (error) {
            throw error
        }
        const jsonData = JSON.parse(JSON.stringify(results.rows));

        response.header('Content-Type', 'text/csv');
        response.attachment('survey_result_' + userId + '.csv');
        fastcsv
            .write(jsonData, { headers: true })
            .pipe(response)
            .on("finish", function () {
                console.log("Write to CSV completed successfully!");
            });
    })
}

const getUserFormResults = (request, response) => {
    pool.query('SELECT * FROM view_userform_results', (error, results) => {
        if (error) {
            throw error
        }
        const jsonData = JSON.parse(JSON.stringify(results.rows));

        response.header('Content-Type', 'text/csv');
        response.attachment('demographic_result.csv');
        fastcsv
            .write(jsonData, { headers: true })
            .pipe(response)
            .on("finish", function () {
                console.log("Write to CSV completed successfully!");
            });
    })
}

const getUserFormResultsPerUser = (request, response) => {
    const userId = request.params.userId

    pool.query('SELECT * FROM view_userform_results where user_id = $1', [userId], (error, results) => {
        if (error) {
            throw error
        }
        const jsonData = JSON.parse(JSON.stringify(results.rows));

        response.header('Content-Type', 'text/csv');
        response.attachment('demographic_result_' + userId + '.csv');
        fastcsv
            .write(jsonData, { headers: true })
            .pipe(response)
            .on("finish", function () {
                console.log("Write to CSV completed successfully!");
            });
    })
}

const createPSForm = (request, response) => {
    const data = request.body

    pool.query(format('INSERT INTO results_user_psform (user_id, question_id, answer) VALUES %L Returning *', data), (error, results) => {
        if (error) {
            throw error
        }
        // console.log(`UserPSForm added ${results.rowCount} rows`)
        response.status(201).send(`UserPSForm added ${results.rowCount} rows`)
    })
}

const createUserBargains = (request, response) => {
    const data = request.body

    pool.query(format('INSERT INTO results_user_bargains (user_id, store_number, type_task, enter_store_timestamp, leave_store_timestamp, products_seen, last_product_displayed, bargain_taken_number, bargain_shown_number) VALUES %L Returning *', data), (error, results) => {
        if (error) {
            throw error
        }
        // console.log(`UserPSForm added ${results.rowCount} rows`)
        response.status(201).send(`UserBargains added ${results.rowCount} rows`)
    })
}

const createAuctionBids = (request, response) => {
    const data = request.body

    const query = format('INSERT INTO results_user_auctions (user_id, screen_name, hotel_id, hotel_name, price_start, bid, bid_start_timestamp, bid_stop_timestamp) VALUES %L Returning *', data)

    // console.log(query)

    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        // console.log(`UserAuctionBids added  ${results.rowCount} rows`)
        // console.log(`UserAuctionBids added  ${results.rows} rows`)
        response.status(201).send(`UserAuctionBids added ${results.rowCount} rows`)
    })
}

const createVisualPattern = (request, response) => {
    const data = request.body

    const query = format('INSERT INTO results_user_visualpattern (user_id, screen_name, level, matrix_dimention, matrix, matrix_result, correct_tiles, incorrect_tiles, missing_tiles, retry, time_spent_in_screen) VALUES %L Returning *', data)

    // console.log(query)

    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        // console.log(`UserVisualPattern added  ${results.rowCount} rows`)
        // console.log(`UserVisualPattern added  ${results.rows} rows`)
        response.status(201).send(`UserVisualPattern added ${results.rowCount} rows`)
    })
}

const createUserInfo = (request, response) => {
    const { info, form } = request.body

    let query1 = format('INSERT INTO results_user_info (user_id, os_name, os_version, browser_name, browser_version, browser_major, browser_language, engine_name, engine_version, screen_width, screen_height) VALUES %L Returning *;', info);

    let query2 = format('INSERT INTO results_user_form (user_id, ariadna_user_id, sex, age, profession, years_education, level_education, version_task) VALUES %L Returning *;', form);

    // console.log(query1 + query2)

    pool.query(query1 + query2, (error, results) => {
        if (error) {
            throw error
        }
        // console.log(`UserInfo and UserForm added  ${results.rowCount} rows`)
        // console.log(`UserInfo and UserForm added  ${results.rows} rows`)
        response.status(201).send(`UserInfo and UserForm added ${results.rowCount} rows`)
    })
}

const createUserLogTime = (request, response) => {
    const data = request.body

    const query = format('INSERT INTO results_user_logtime (user_id, screen_name, timestamp, time_spent_in_screen) VALUES %L Returning *', data);

    // console.log(query)

    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        // console.log(`UserLog added  ${results.rowCount} rows`)
        // console.log(`UserLog added  ${results.rows} rows`)
        response.status(201).send(`UserLog added ${results.rowCount} rows`)
    })
}

const createUserGeneraldata = (request, response) => {
    const data = request.body

    const query = format('INSERT INTO results_user_general_data (column1, column2, column3, column4, column5, column6, column7,column8, column9, column10, column11, column12, column13) VALUES %L Returning *', data);

    // console.log(query)

    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        // console.log(`UserGeneraldata added  ${results.rowCount} rows`)
        // console.log(`UserGeneraldata added  ${results.rows} rows`)
        response.status(201).send(`UserGeneraldata added ${results.rowCount} rows`)
    })
}

module.exports = {
    getUsers,
    getUserInitialData,
    getVersions,
    getPSFormData,
    getAppTextData,
    getMemoryTaskResult,
    getBargainsResult,
    getBargainsResultPerStore,
    getPSFormResults,
    getUserFormResults,
    getBargainsResultPerUser,
    getBargainsResultPerStorePerUser,
    getPSFormResultsPerUser,
    getUserFormResultsPerUser,
    getMemoryTaskResultPerUser,
    createPSForm,
    createAuctionBids,
    createVisualPattern,
    createUserInfo,
    createUserLogTime,
    createUserGeneraldata,
    createUserBargains
}
