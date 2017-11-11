from twilio.rest import Client

# Get these credentials from http://twilio.com/user/account
account_sid = "ACaf168fd0aab1c98754c941dc75e5b8e3"
auth_token = "0ac7093044339bf2fc342a88ca3cc924"
client = Client(account_sid, auth_token)

# Make the call
call = client.api.account.calls\
      .create(to="+19084215622",  # Any phone number
              from_="+16099177877", # Must be a valid Twilio number
              url="http://twimlets.com/holdmusic?Bucket=com.twilio.music.ambient")

print(call.sid)