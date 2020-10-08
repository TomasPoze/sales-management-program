package com.codeacademy.praktika.comment.controller;

import com.codeacademy.praktika.comment.entity.Comment;
import com.codeacademy.praktika.comment.service.CommentService;
import com.codeacademy.praktika.user.entity.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/{id}")
    public Comment createComment(@AuthenticationPrincipal User user, @PathVariable Long id, @RequestBody Comment comment){
        return commentService.createComment(user,id,comment);
    }


    @GetMapping("/all/{id}")
    public List<Comment> getCommentsByOrderId(@PathVariable Long id){
        return commentService.getCommentsByOrderId(id);
    }

}
