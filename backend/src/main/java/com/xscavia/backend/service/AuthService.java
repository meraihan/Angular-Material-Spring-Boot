package com.xscavia.backend.service;

import com.xscavia.backend.model.User;
import com.xscavia.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;

@Service
public class AuthService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Transactional
    public boolean verify(String verificationCode){
        User user = userRepository.findByVerificationCode(verificationCode);
        if(user == null || user.getIsEnabled()>0 ){
            return false;
        }else{
            return userRepository.enable(user.getId())>0;
        }
    }

    public String getSiteURL(HttpServletRequest request){
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }

    public void sendVerificationEmail(User user, String siteURL, String baseUrlFront)
            throws UnsupportedEncodingException, MessagingException {
        String subject = "Please Verify Your Registration";
        String senderName  = "XSCAVIA";
        String mailContent = "<p>Dear "+user.getUsername()+", </p>";
        mailContent += "<p> Please click the link below to verify your registration:</p>";
        String verifyURL = siteURL + "/api/auth/verify?code="+user.getVerificationCode()+"&baseUrl="+baseUrlFront;
        mailContent += "<h3><a  href= "+verifyURL+" >VERIFY</a></h3>";
        mailContent += "<p> Thank you<br> The XSCAVIA </p>";
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("sayedmahmudraihan@gmail.com", senderName);
        helper.setTo(user.getEmail());
        helper.setSubject(subject);
        helper.setText(mailContent, true);
        mailSender.send(message);
    }
}
