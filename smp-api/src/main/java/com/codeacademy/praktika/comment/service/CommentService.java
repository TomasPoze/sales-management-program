package com.codeacademy.praktika.comment.service;

import com.codeacademy.praktika.comment.entity.Comment;
import com.codeacademy.praktika.comment.repository.CommentRepository;
import com.codeacademy.praktika.order.service.OrderService;
import com.codeacademy.praktika.user.entity.User;
import com.codeacademy.praktika.user.services.UserService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final OrderService orderService;

    public CommentService(CommentRepository commentRepository, OrderService orderService) {
        this.commentRepository = commentRepository;
        this.orderService = orderService;
    }

    public Comment createComment(User user, Long id, Comment comment) {
        LocalDateTime localDateTime = LocalDateTime.now();
        comment.setCommentDate(localDateTime);
        comment.setUser(user);
        comment.setOrder(orderService.getOrderById(id));
        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByOrderId(Long id) {
        return commentRepository.findCommentsByOrderId(id);
    }
}
