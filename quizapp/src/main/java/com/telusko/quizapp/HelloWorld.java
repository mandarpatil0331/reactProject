package com.telusko.quizapp;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorld{
    @RequestMapping("/")
    public String greet(){
        return "Hello World,Welcome to Mandar";
    }
}



