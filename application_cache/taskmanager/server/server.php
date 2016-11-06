<?php
// In case you dont have access to web server configuration
// check http://enable-cors.org/server_php.html
header("Access-Control-Allow-Origin: *");

// We we only manage POST Requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $message = array();
    $file  = dirname(__FILE__)."/tasks.json";
    $content = file_get_contents($file);
    $tasks = json_decode($content, true);
    switch($_POST['action']){
        case "list":
            // create the response
            $message["type"] = "OK";
            $message["data"] = $tasks;
            break;
        case "add":
            // create the task
            $task = array('id'=> uniqid(), "task"=>$_POST["task"]);
            // push it to the array pf tasks
            array_push($tasks, $task);

            // save the file :
            file_put_contents($file, json_encode($tasks));

            // create the response
            $message["type"] = "OK";
            $message["data"] = $task;

            break;
        case "remove":
            // Get the task id
            $id = $_POST["id"];
            $tmpTasks = array();
            $found = false;
            foreach($tasks as $task){
                if( $task["id"] !== $id ){
                    array_push($tmpTasks, $task);
                } else {
                    $found = true;
                }
            }
            if( $found ){
                // Ok task was deleted
                $message["type"] = "OK";
                $message["data"] = $id;
                file_put_contents($file, json_encode($tmpTasks));
            } else {
                $message["type"] = "KO";
                $message['message'] = "Task No Found";
            }
            break;
        case "update":
        case "edit":
            // Get the task id
            $id = $_POST["id"];
            $taskPosted = $_POST["task"];
            $tmpTasks = array();
            $found = false;
            foreach($tasks as $task){
                if( $task["id"] === $id ){
                    $task["id"] = $id;
                    $task["task"] = $taskPosted;
                    $found = true;
                }
                array_push($tmpTasks, $task);
            }
            if( $found ){
                // Ok task was deleted
                $message["type"] = "OK";
                $message["data"] = array('id'=>$id, 'task'=>$taskPosted);
                file_put_contents($file, json_encode($tmpTasks));
            } else {
                $message["type"] = "KO";
                $message['message'] = "Task No Found";
            }
            break;
        case 'reset':
            // save the file :

            file_put_contents($file, json_encode(array()));
            $message["type"] = "OK";
            $message["data"] = "";
            break;
        default:
            $message = array(
                "type"=>"ERR",
                "message" =>"Action unknown : ".$_POST["action"]."."
            );

            break;
    }
    // Print the result
    echo json_encode($message);
} else {
    $message = array(
        "type"=>"ERR",
        "message" =>"Request should be post, nothing to do ..."
    );
    echo json_encode($message);
}